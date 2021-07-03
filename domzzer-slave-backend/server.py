import os

from flask import Flask

from modules.fuzzer.config import Config
from modules.fuzzer.fuzzer import Fuzzer
from modules.generator.generator import Generator


app = Flask(__name__)
config = Config(os.getcwd())
generator = Generator()
dom_fuzzer = Fuzzer(generator, [], None)


@app.route("/fuzzer/document/loaded")
def fuzzer_document_loaded():
    """
    HTTP POST to this path will notify the fuzzer that
    generated document was succesfully loaded by the web browser under testing. 
    """
    return "Document loaded succesfully"


@app.route("/fuzzer/start")
def fuzzer_start():
    """
    HTTP POST to this path will start the fuzzer.
    If fuzzer is already running, this will have no effect.
    """
    return "Start fuzzer!"


@app.route("/fuzzer/stop")
def fuzzer_stop():
    """
    HTTP POST to this path will stop the fuzzer.
    If fuzzer is already stopped, this will have no effect.
    """
    return "Stop fuzzer!"


@app.route("/fuzzer/reset")
def fuzzer_reset():
    """
    HTTP POST to this path will reset the fuzzer to default settings.
    """
    return "Reset fuzzer!"


@app.route("/fuzzer/configure")
def fuzzer_configure():
    """
    HTTP POST to this path will configure the fuzzer settings with
    request information. If request information is invalid, changes are dropped.
    """
    return "Configure fuzzer!"


@app.route("/fuzzer/status")
def fuzzer_status():
    """
    HTTP GET to this path will return fuzzer status.
    """
    return "Fuzzer status!"


@app.route("/db/tests")
def db_tests():
    """
    HTTP GET to this path will return the total number of tests performed
    by the fuzzer.
    """
    return "Number of tests performed!"


@app.route("/db/vulnerabilities")
def db_vulnerabilities():
    """
    HTTP GET to this path will return all the potential vulnerabilities found by the fuzzer.
    """
    return "Potential vulnerabilities!"


@app.route("/db/tests/reset")
def db_tests_reset():
    """
    HTTP POST to this path will reset the number of tests performed by the fuzzer.
    Value after response will be 0.
    """
    return "Reset number of tests performed!"


@app.route("/db/vulnerabilities/reset")
def db_vulnerabilities_reset():
    """
    HTTP POST to this path reset the vulnerabilities in the database.
    All potential vulnerabilities will be dropped. This should be called when
    the vulnerabilities have already been copied to the master server.
    """
    return "Remove all vulnerabilities from database!"


# start the slave server
app.run(host="0.0.0.0", port=config.get_server_port())
