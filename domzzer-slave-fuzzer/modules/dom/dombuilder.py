import random

from .htmldocument import HTMLDocument


class DOMBuilder:

    def __init__(self):
        """ Constucts new DOMBuilder object instance.
        """
        self.ELEMENTS_LIMIT_MIN = 500
        self.ELEMENTS_LIMIT_MAX = 2500
        self.MUTATIONS_LIMIT_MIN = 1000
        self.MUTATIONS_LIMIT_MAX = 5000
        self.MUTATION_ROUNDS_LIMIT_MIN = 1
        self.MUTATION_ROUNDS_LIMIT_MAX = 5

    def build(self):
        """ Builds the html-document.

        Generates new html-document based on the configurations.
        
        Returns:
            str: the generated document
        """
        document = HTMLDocument()

        # random values for settings
        doc_elements_limit = random.randint(self.ELEMENTS_LIMIT_MIN, self.ELEMENTS_LIMIT_MAX)
        doc_mutations_limit = random.randint(self.MUTATIONS_LIMIT_MIN, self.MUTATIONS_LIMIT_MAX)
        doc_mutation_rounds_limit = random.randint(self.MUTATION_ROUNDS_LIMIT_MIN, self.MUTATION_ROUNDS_LIMIT_MAX)

        # create initial dom tree
        self.__build_initial_dom_tree(document, doc_elements_limit)

        # perform mutation rounds
        mutation_round = 0
        while mutation_round < doc_mutation_rounds_limit:
            last_used_id = (mutation_round + 1) * doc_elements_limit + 1
            self.__build_one_mutation_round(document, doc_mutations_limit, last_used_id)
            mutation_round += 1

        # convert the document into string and return it
        return document.convert()
    
    def __build_initial_dom_tree(self, document, doc_elements_limit):
        """ Builds initial dom tree, """
        # generate initial elements and build random dom tree
        element_counter = 0
        while element_counter < doc_elements_limit:
            element_id = "id" + str(element_counter)
            var_name = "var" + str(element_counter)
            document.generate_new_element(element_id, var_name)
            element_counter += 1
        
        # set random attributes for generated elements
        for element_id in document.html_element_ids:
            self.__add_attributes_for_element(document, element_id)

        for element_id in document.svg_element_ids:
            self.__add_attributes_for_element(document, element_id)

        for element_id in document.mathml_element_ids:
            self.__add_attributes_for_element(document, element_id)

        for element_id in document.canvas_element_ids:
            self.__add_attributes_for_element(document, element_id)

    def __add_attributes_for_element(self, document, element_id):
        """ Generates random attributes for element with given id. """
        num_of_attributes = random.randint(0, 5)
        attribute_counter = 0
        while attribute_counter < num_of_attributes:
            document.generate_attribute_for_element(element_id)
            attribute_counter += 1

    def __build_one_mutation_round(self, document, doc_mutations_limit, last_used_id):
        """ Builds one mutation round for document. """
        
        # generate some elements and add them to dom tree

        # delete some elements

        # collect references

        # crawl the document tree

        # set random attributes for generated elements

        # mutate and stuff...
        