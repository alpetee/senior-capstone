from flask import Flask

app = Flask(__name__)

from . import routes  # importing routes so theyr registered with the app

_author__ = "Allie Peterson"
__credits__ = ["Allie Peterson"]
__license__ = "MIT"
__email__ = ["alpeterson@westmont.edu"]
