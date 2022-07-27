import os
import requests
import sys


class ResultWriter:

    def __init__(self, destination="FILE", db_address=None, db_username=None, db_password=None):
        """ Constructs a new ResultWriter object instance.

        Args:
            destination (str): destination of write operations (FILE, DB, DBFILE)
            db_address (str): database address
            db_username (str): database username
            db_password (str): database password
        """
        self._destination = destination
        self._db_address = db_address
        self._db_username = db_username
        self._db_password = db_password

    def save_document(self, document_name, document_content):
        """ Save document into /results/documents folder.

        Takes a generated html document and saves it into /results/documents folder.
        If document with a given document name already exists, it will be overwritten.

        Args:
            document_name (str): name of a the document to be saved (without filetype extension)
            document_content (str): content of the html file to be saved
        """
        # get current directory
        cwd = os.getcwd()

        # create results directory if it does not exist yet
        results_dir_exists = False
        for subdir in os.listdir(cwd):
            if (subdir == "results" and os.path.isdir(os.path.join(cwd, subdir))):
                results_dir_exists = True

        if not results_dir_exists:
            os.mkdir(os.path.join(cwd, "results"))

        # create documents folder inside the results directory if it does not exist yet
        documents_dir_exists = False
        results_dir = os.path.join(cwd, "results")
        for subdir in os.listdir(results_dir):
            if (subdir == "documents" and os.path.isdir(os.path.join(results_dir, subdir))):
                documents_dir_exists = True

        if not documents_dir_exists:
            os.mkdir(os.path.join(results_dir, "documents"))

        # write html document inside the documents folder
        documents_dir = os.path.join(results_dir, "documents")
        new_file_path = os.path.join(documents_dir, document_name + ".html")
        f = open(new_file_path, "w")
        f.write(document_content)
        f.close()

    def save_vulnerability(self, vulnerability_name, vulnerability_content, target_browser):
        """ Save vulnerability to database, file, or both.

        The destination depends on the ResultWriter configuration. The folder location for 
        files is /results/vulnerabilities folder.
        If vulnerability with a given vulnerability name already exists, it will be overwritten.

        Args:
            vulnerability_name (str): name of a the vulnerability to be saved (without filetype extension)
            vulnerability_content (str): content of the html file to be saved
            target_browser (str): vulnerable browser
        """
        if (self._destination not in ["FILE", "DB", "DBFILE"]):
            raise Exception("Unsupported vulnerability save destination!")

        if (self._destination in ["DB", "DBFILE"]):
            self._save_vulnerability_to_db(
                vulnerability_content, target_browser)

        # return if vulnerability should not be saved into file
        if (self._destination != "FILE" and self._destination != "DBFILE"):
            return

        # get current directory
        cwd = os.getcwd()

        # create results directory if it does not exist yet
        results_dir_exists = False
        for subdir in os.listdir(cwd):
            if (subdir == "results" and os.path.isdir(os.path.join(cwd, subdir))):
                results_dir_exists = True

        if not results_dir_exists:
            os.mkdir(os.path.join(cwd, "results"))

        # create vulnerabilities folder inside the results directory if it does not exist yet
        vulnerabilities_dir_exists = False
        results_dir = os.path.join(cwd, "results")
        for subdir in os.listdir(results_dir):
            if (subdir == "vulnerabilities" and os.path.isdir(os.path.join(results_dir, subdir))):
                vulnerabilities_dir_exists = True

        if not vulnerabilities_dir_exists:
            os.mkdir(os.path.join(results_dir, "vulnerabilities"))

        # write html document inside the vulnerabilities folder
        # add vulnerable browser as a comment inside the document
        vulnerability_content += "\n<!--" + target_browser + "-->"
        vulnerablities_dir = os.path.join(results_dir, "vulnerabilities")
        new_file_path = os.path.join(
            vulnerablities_dir, vulnerability_name + ".html")
        f = open(new_file_path, "w")
        f.write(vulnerability_content)
        f.close()

    def _save_vulnerability_to_db(self, vulnerability_content, target_browser):
        """ Save vulnerability to database.

        Save vulnerability to database by using the SlaveAPI.

        Args:
            vulnerability_content (str): content of the html file to be saved
            target_browser (str): vulnerable browser
        """
        # login to slave api and get the authentication token
        url = self._db_address
        if url[-1] == "/":
            url += "api/login"
        else:
            url += "/api/login"

        login_object = {"username": self._db_username,
                        "password": self._db_password}
        token = None
        try:
            response = requests.post(url, json=login_object, verify=False)
            if response.status_code == 200:
                token = response.text
        except Exception as e:
            print(e)
            print("Connection to SlaveAPI failed!")
            sys.exit()

        # create payload
        payload = {"targetBrowser": target_browser,
                   "payload": vulnerability_content}

        # send payload to api and get the id (new name of the vulnerability)
        url = self._db_address
        if url[-1] == "/":
            url += "api/vulnerabilities"
        else:
            url += "/api/vulnerabilities"

        try:
            response = requests.post(url, json=payload, verify=False, headers={
                                     'Authorization': "Bearer " + token})
            if response.status_code == 200:
                pass
        except Exception as e:
            print(e)
            print("Connection to SlaveAPI failed!")
            sys.exit()
