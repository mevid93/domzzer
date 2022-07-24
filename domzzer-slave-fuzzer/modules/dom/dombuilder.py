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
        doc_mutations_limit = random.randint(self.MUTATIONS_LIMIT_MIN, self.MUTATIONS_LIMIT_MAX)
        
        # generate initial elements and build random dom tree
        element_counter = 0
        while element_counter < doc_elements_limit:
            element_id = "id" + str(element_counter)
            var_name = "var" + str(element_counter)
            document.generate_new_element(element_id, var_name)
            element_counter += 1

        # set random attributes for generated elements

        # mutate and stuff...

        # convert the document into string and return it
        return document.convert()