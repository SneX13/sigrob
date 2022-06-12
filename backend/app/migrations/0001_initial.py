# Generated by Django 4.0.5 on 2022-06-12 20:07

import django.utils.timezone
import django_fsm
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True,
                                           serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True,
                                                    verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False,
                                                     help_text='Designates that this '
                                                               'user has all '
                                                               'permissions without '
                                                               'explicitly assigning '
                                                               'them.',
                                                     verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150,
                                                verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150,
                                               verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False,
                                                 help_text='Designates whether the '
                                                           'user can log into this '
                                                           'admin site.',
                                                 verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True,
                                                  help_text='Designates whether this '
                                                            'user should be treated '
                                                            'as active. Unselect this '
                                                            'instead of deleting '
                                                            'accounts.',
                                                  verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now,
                                                     verbose_name='date joined')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True,
                                           serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('logo',
                 models.ImageField(default=None, null=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='System',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True,
                                           serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('control_state', django_fsm.FSMField(
                    choices=[('no_controller', 'No_Controller'),
                             ('single_controller', 'Single_Controller'),
                             ('control_change_request', 'Control_Change_Request')],
                    default='no_controller', max_length=50, protected=True)),
                ('company',
                 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                   to='app.company')),
                ('user_in_control', models.ForeignKey(null=True,
                                                      on_delete=django.db.models.deletion.SET_NULL,
                                                      to=settings.AUTH_USER_MODEL)),
            ],
            bases=(django_fsm.ConcurrentTransitionMixin, models.Model),
        ),
        migrations.CreateModel(
            name='Component',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True,
                                           serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('x_position', models.FloatField(default=0.0)),
                ('y_position', models.FloatField(default=0.0)),
                ('rotation', models.FloatField(default=0.0)),
                ('mirrored', models.BooleanField(default=False)),
                ('scale', models.FloatField(default=1.0)),
                ('system',
                 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                   to='app.system')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='company',
            field=models.ForeignKey(null=True,
                                    on_delete=django.db.models.deletion.CASCADE,
                                    to='app.company', to_field='name'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True,
                                         help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
                                         related_name='user_set',
                                         related_query_name='user', to='auth.group',
                                         verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True,
                                         help_text='Specific permissions for this user.',
                                         related_name='user_set',
                                         related_query_name='user',
                                         to='auth.permission',
                                         verbose_name='user permissions'),
        ),
    ]
