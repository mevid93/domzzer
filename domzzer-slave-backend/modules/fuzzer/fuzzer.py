from random import randint
from threading import Thread

from modules.generator.generator import Generator


class Fuzzer (Thread):
    """ Class responsible for fuzzing browser rendering engines.

    Class uses generator class to generate HTML documents which are then
    fed to browsers. Browsers load the documents and fuzzer tries to detect
    possible errors. If no errors are detected, the fuzzer proceeds to next
    iteration. In case errors were detected, the document, browser details,
    and possible additional details are saved to database for manual analysis.

    Methods
    -------
    document_loaded(document_id)
        Informs the fuzzer that html-document with some document if was loaded succesfully by
        the browser, and that the http-request sent by the browser was received.
    """

    def __init__(self, generator, browsers, server_address):
        """ Class constructor.

        Attributes
        ----------
        last_document_loaded: str
            Document id of the last document succesfully loaded by browser

        Parameters
        ----------
        generator: Generator
            HTML document generator class
        browsers: list[str]
            Paths for each available browser executable
        server_address: str
            Address of the flask server where fuzzer is to be run
        """
        Thread.__init__(self)

        if generator == None:
            raise ValueError
        if not isinstance(generator, Generator):
            raise TypeError
        self.__generator = generator

        if browsers == None:
            raise ValueError
        if not isinstance(browsers, list):
            raise TypeError
        self.__browsers = browsers

        if server_address == None:
            raise ValueError
        if not isinstance(server_address, str):
            raise TypeError
        self.__server_address = server_address
        self.last_document_loaded = None

    def run(self):
        """ Method starts fuzzing thread.

        Method starts running the fuzzing process thread.
        """
        while True:

            # generate random document id that is different from the last one
            document_id = None
            while True:
                document_id = "id_" + str(randint(0, 100000))
                if document_id != self.last_document_loaded:
                    break

            # generate new document
            error_detected = False
            error_browser = None
            error_summary = None
            document = self.__generator.generate_new_document(document_id, 5)

            # try to load the generated document with every browser

            # if no error was detected with the base version of the generated document,
            # try to mutate the document at most ten times
            for i in range(10):
                if error_detected:
                    break
                document.mutate()

                    # try to load the mutated document with every browser
            
            # if error was detected, then save the information to the database
            if error_detected:
                pass
