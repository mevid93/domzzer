#!/usr/bin/python

from threading import Thread


class Fuzzer (Thread):
    """ Class responsible for fuzzing browser rendering engines.

    Class uses generator class to generate HTML documents which are then
    fed to browser. Browser loads the documents and fuzzer tries to detecte
    possible errors. If no errors were detected, the fuzzer proceeds to next
    iteration. In case errors were detected, the document, browser details,
    and possible additional details are saved to later manual analysis.

    Attributes
    ----------
    generator: Generator
        HTML document generator class
    browsers: Array of str
        Paths for each browser executables to be fuzzed
    server_address: str
        Address of the flask server where fuzzer is to be run
    last_document_loaded: int
        Id of the last document that was loaded succesfully by one of the browser

    Methods
    -------
    document_loaded(document_id)
        Informs the fuzzer that html-document with id document_id was loaded succesfully by
        the browser, and that the http-request was received to indicate this event.
    """

    def __init__(self, generator, browsers, server_address):
        """ Class constructor.

        Parameters
        ----------
        generator: Generator
            HTML document generator class
        browsers: Array of str
            Paths for each browser executables to be fuzzed
        server_address: str
            Address of the flask server where fuzzer is to be run
        """
        Thread.__init__(self)
        self.generator = generator
        self.browsers = browsers
        self.server_address = server_address
        self.last_document_loaded = None

    def run(self):
        while True:
            # generate doc
            for browser in self.browsers:
                # try to load document
                # wait for max 10 seconds
                # check possible errors
                # if errors, save document
                continue
            # update databases and remove document
        pass

    def document_loaded(document_id):
        pass
