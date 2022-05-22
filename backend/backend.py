from .authentication import AuthenticationManager


def run():
    authentication_manager = AuthenticationManager()
    input_user = "user1"
    input_password = "password123"

    authentication_manager.attempt_login(input_user, input_password)
    authentication_manager.logout(input_user)
