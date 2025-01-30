"""File handling routing logic.
"""

from flask import Flask, jsonify
from . import app

_author__ = "Allie Peterson"
__credits__ = ["Allie Peterson"]
__license__ = "MIT"
__email__ = ["alpeterson@westmont.edu"]


@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint to confirm if the backend is working. This is my first health check!
    """
    return jsonify({"status": "ok"}), 200
