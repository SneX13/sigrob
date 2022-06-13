from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models, transaction
from django_fsm import FSMField, transition, ConcurrentTransitionMixin


class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    logo = models.ImageField(upload_to="images/", default=None, null=True)

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    # A custom user manager to be able to add user with email authentication from:

    # https://koenwoortman.com/python-django-email-as-username/#:~:text=By%20default%
    # 20these%20Django%20users,migrations%20for%20the%20first%20time.
    use_in_migration = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users require an email field')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    company = models.ForeignKey(Company, models.CASCADE, to_field='name', null=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        string = f'{self.company} | {self.full_name}'
        if self.is_superuser:
            string += f' (superuser)'
        elif self.is_staff:
            string += f' (admin)'
        return string

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class System(ConcurrentTransitionMixin, models.Model):
    class STATE:
        NO_CONTROLLER = 'no_controller'
        SINGLE_CONTROLLER = 'single_controller'
        CONTROL_CHANGE_REQUEST = 'control_change_request'

        INITIAL = NO_CONTROLLER
        CHOICES = (
            (NO_CONTROLLER, NO_CONTROLLER.title()),
            (SINGLE_CONTROLLER, SINGLE_CONTROLLER.title()),
            (CONTROL_CHANGE_REQUEST, CONTROL_CHANGE_REQUEST.title()),
        )

    name = models.CharField(max_length=255)

    company = models.ForeignKey(Company, models.CASCADE, null=True)
    user_in_control = models.ForeignKey(User, models.SET_NULL, null=True)
    control_state = FSMField(
        max_length=50,
        default=STATE.INITIAL,
        choices=STATE.CHOICES,
        protected=True,
    )

    def __str__(self):
        return f'{self.company} | {self.name}'

    def atomic_save(self):
        with transaction.atomic(durable=True):
            self.save()

    @transition(
        field=control_state,
        source=STATE.NO_CONTROLLER,
        target=STATE.SINGLE_CONTROLLER,
    )
    def acquire_system_control(self):
        ...

    @transition(
        field=control_state,
        source=STATE.SINGLE_CONTROLLER,
        target=STATE.NO_CONTROLLER,
    )
    def release_system_control(self):
        ...

    @transition(
        field=control_state,
        source=STATE.SINGLE_CONTROLLER,
        target=STATE.CONTROL_CHANGE_REQUEST,
    )
    def request_control_from_user(self):
        ...

    @transition(
        field=control_state,
        source=STATE.CONTROL_CHANGE_REQUEST,
        target=STATE.SINGLE_CONTROLLER,
    )
    def transfer_control_to_user(self):
        ...


class Component(models.Model):
    class STATE:
        IDLE = 'idle'
        RUNNING = 'running'
        AUTOMATIC = 'automatic'
        ERROR = 'error'

        INITIAL = IDLE
        CHOICES = (
            (IDLE, IDLE.title()),
            (RUNNING, RUNNING.title()),
            (AUTOMATIC, AUTOMATIC.title()),
            (ERROR, ERROR.title()),
        )

    name = models.CharField(max_length=255)
    system = models.ForeignKey(System, models.CASCADE)
    x_position = models.FloatField(default=0.0)
    y_position = models.FloatField(default=0.0)
    rotation = models.FloatField(default=0.0)
    mirrored = models.BooleanField(default=False)
    scale = models.FloatField(default=1.0)
    error_flag = models.BooleanField(default=False)
    state = FSMField(
        max_length=50,
        default=STATE.INITIAL,
        choices=STATE.CHOICES,
        protected=True,
    )

    def atomic_save(self):
        with transaction.atomic(durable=True):
            self.save()

    @transition(
        field=state,
        source=STATE.IDLE,
        target=STATE.RUNNING,
    )
    def start(self):
        ...

    @transition(
        field=state,
        source=[STATE.RUNNING, STATE.AUTOMATIC],
        target=STATE.IDLE,
    )
    def stop(self):
        ...

    @transition(
        field=state,
        source='*',
        target=STATE.IDLE,
    )
    def reset(self):
        ...  # Set origin/initial positions here

    @transition(
        field=state,
        source=STATE.IDLE,
        target=STATE.AUTOMATIC,
    )
    def auto_mode(self):
        ...

    @transition(
        field=state,
        source='*',
        target=STATE.ERROR,
    )
    def error_mode(self):
        ...

    def __str__(self):
        return f'{self.system} | {self.name}'
