from random import randint

from modules.htmlir.element.element import HTMLElement
from modules.htmlir.attribute.globl.attributes import get_random_global_attributes

class HTMLBodyElement(HTMLElement):
    """ Class representing HTML document body element.

    Attributes
    ----------
    document_depth: int
        Length of the longest path from element to any leaf node
    text: str,
        Text of the element
    child_elements: list
        List of child elements
    attributes: list
        List of element attributes
    includes_global_attributes: boolean
        Does the element include the global attributes
    global_attributes: list
        List of global element attributes
    """

    def __init__(self, document_depth):
        """ Constructor for HTMLElementHead object.

        Parameters
        ----------
        document_depth: int
            Length of the longest path from element to any leaf node
        """
        if document_depth == None:
            raise ValueError
        if not isinstance(document_depth, int):
            raise TypeError
        self.document_depth = document_depth
        self.document_depth = 0
        self.attributes = []
        self.text = ""
        self.includes_global_attributes = True
        self.global_attributes = []
        self.child_elements = []
        self.mutate()

    def get_child_elements(self):
        return self.child_elements

    def get_attributes(self):
        return self.attributes

    def get_text(self):
        return self.text

    def mutate(self):
        # first handle the attributes
        number_of_attributes = randint(0, len(LIST_OF_POSSIBLE_ATTRIBUTES))
        copy_of_possible_attributes = LIST_OF_POSSIBLE_ATTRIBUTES.copy()
        new_attributes = []
        for i in range(number_of_attributes):
            index = randint(0, len(copy_of_possible_attributes) - 1)
            attribute_type = copy_of_possible_attributes[index]
            existing = False
            for old_attribute in self.attributes:
                if isinstance(old_attribute, attribute_type):
                    old_attribute.mutate()
                    new_attributes.append(old_attribute)
                    existing = True
                    break
            if not existing:
                new_attributes.append(attribute_type.generate())
            del copy_of_possible_attributes[index]
        self.attributes = new_attributes
        self.global_attributes = get_random_global_attributes()

        # then handle the text
        index = randint(0, len(LIST_OF_POSSIBLE_TEXTS) - 1)
        self.text = LIST_OF_POSSIBLE_TEXTS[index]

        if self.document_depth <= 0:
            return

        # then handle the child elements
        number_of_elements = randint(0, len(LIST_OF_POSSIBLE_CHILD_ELEMENTS))
        copy_of_possible_elements = LIST_OF_POSSIBLE_CHILD_ELEMENTS.copy()
        new_elements = []
        for i in range(number_of_elements):
            index = randint(0, len(copy_of_possible_elements) - 1)
            element_type = copy_of_possible_elements[index]
            existing = False
            for old_element in self.child_elements:
                if isinstance(old_element, element_type):
                    old_element.mutate()
                    new_elements.append(old_element)
                    existing = True
                    break
            if not existing:
                new_elements.append(
                    element_type.generate(self.document_depth - 1))
            del copy_of_possible_elements[index]
        self.child_elements = new_elements

    def add_css(self):
        pass

    def add_scripts(self):
        pass

    def convert(self):
        body_str = "<body"
        for attribute in self.attributes:
            body_str += " " + attribute.convert()
        for attribute in self.global_attributes:
            body_str += " " + attribute.convert()
        body_str += ">\n"
        for element in self.child_elements:
            body_str += element.convert() + "\n"
        body_str += self.text + "\n"
        body_str += "</body>"
        return body_str

    @staticmethod
    def generate(document_depth):
        if document_depth == None:
            raise ValueError
        if not isinstance(document_depth, int):
            raise TypeError
        body = HTMLBodyElement(document_depth)
        return body


# list of child elements that can be used for <head> element
LIST_OF_POSSIBLE_CHILD_ELEMENTS = [

]

# list of attributes that can be used for <head> element
LIST_OF_POSSIBLE_ATTRIBUTES = [

]

# list of possible texts for element
LIST_OF_POSSIBLE_TEXTS = [
    "domzzer",
    "mevid93",
    "https://github.com/mevid93/domzzer",
    ""
]
