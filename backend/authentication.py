import csv


class AuthenticationManager:
    def __init__(self):
        self.logged_in = []

    def attempt_login(self, input_user: str, input_password: str) -> bool:
        entries = self._read_users_from_database()
        for user, password in entries:
            if user == input_user and password == input_password:
                self.logged_in.append(input_user)
                return True
        return False

    def logout(self, input_user: str) -> bool:
        try:
            self.logged_in.remove(input_user)
            return True
        except ValueError:
            return False

    @staticmethod
    def _read_users_from_database() -> [(str, str)]:
        with open('users.csv') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            entries = [entry for entry in csv_reader][1:]
        return entries
