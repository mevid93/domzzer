import random

from .htmldocument import HTMLDocument


class DOMBuilder:

    def __init__(self):
        """Constucts new DOMBuilder object instance.
        """
        self.ELEMENTS_LIMIT_MIN = 50
        self.ELEMENTS_LIMIT_MAX = 1000
        self.MUTATIONS_LIMIT_MIN = 50
        self.MUTATIONS_LIMIT_MAX = 1000

    def build(self):
        """Builds the html-document.

        Generates new html-document based on the configurations.
        
        Returns:
            str: the generated document
        """
        document = HTMLDocument()

        # random values for settings
        doc_elements_limit = random.randint(self.ELEMENTS_LIMIT_MIN, self.ELEMENTS_LIMIT_MAX)
        doc_api_calls_limit = random.randint(self.API_CALLS_LIMIT_MIN, self.API_CALLS_LIMIT_MAX)
        
        # fill the document with initial elements
        element_counter = 0
        while elements < doc_elements_limit:
            document.generate_new_element()
            element_counter += 1

        # ...???...

        # convert the document into string and return it
        document.use_try_catch = True
        return document.convert()