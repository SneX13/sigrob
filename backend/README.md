# Back-end

Back-end for User Interface Design for Industrial Control Systems

## Features

- Access the API endpoint URLs through HTTP requests.

## Code style

This module follows the [PEP8](https://www.python.org/dev/peps/pep-0008/)
convention for Python code.

## Prerequisites and installation

Create a new **Python 3.10** virtual enviornment using e.g. the graphical user interface
of [PyCharm Professional](
https://www.jetbrains.com/lp/pycharm-anaconda/) as detailed [here](
https://www.jetbrains.com/help/pycharm/conda-support-creating-conda-virtual-environment.html
), and install the required Python package dependencies:

```
pip install --upgrade pip
pip install wheel
pip install django
pip install django-fsm
pip install django-rest-framework

```

## API usage

### Accessing API endpoints

The API endpoints are accessed through the following URLs, for various application
actions:

- http://127.0.0.1:8000/admin/
- http://127.0.0.1:8000/api/components/
- http://127.0.0.1:8000 /api/components/control/<str:action>
- http://127.0.0.1:8000/login/
- http://127.0.0.1:8000/logout/
- http://127.0.0.1:8000/user/
- http://127.0.0.1:8000/systems/
- http://127.0.0.1:8000/systems/systemId
- http://127.0.0.1:8000/systems/control/<str:action>

To test the URLs without an application, one may also download
install [Postman](https://www.postman.com/downloads/) to test each API endpoint.

## Contributors

- Nina Vinding Blindheim ([ninavma@stud.ntnu.no](mailto:ninavma@stud.ntnu.no))