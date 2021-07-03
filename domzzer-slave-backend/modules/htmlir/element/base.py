from random import randint

from modules.htmlir.attribute.href import HTMLHrefAttribute
from modules.htmlir.attribute.target import HTMLTargetAttribute
from modules.htmlir.element.element import HTMLElement


class HTMLBaseElement(HTMLElement):
    """ Class representing HTML base element

    This class represents HTML <base> element.
    Can only be child of <head> element.

    Attributes
    ----------
    document_depth: int
        Length of the longest path from element to any leaf node
    attributes: list
        List of element attributes
    """

    def __init__(self, document_depth):
        """ Constructor for HTMLBaseElement object. 

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
        self.mutate()

    def get_child_elements(self):
        return []

    def get_attributes(self):
        return self.attributes

    def get_text(self):
        return None

    def mutate(self):
        number_of_attributes = randint(1, len(LIST_OF_POSSIBLE_ATTRIBUTES))
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

    def convert(self):
        base_str = "<base"
        for attribute in self.attributes:
            base_str += " " + attribute.convert()
        base_str += ">"
        return base_str

    @staticmethod
    def generate(document_depth):
        if document_depth == None:
            raise ValueError
        if not isinstance(document_depth, int):
            raise TypeError
        base = HTMLBaseElement(document_depth)
        return base


# list of attributes that can be used for <base> element
LIST_OF_POSSIBLE_ATTRIBUTES = [
    HTMLTargetAttribute,
    HTMLHrefAttribute
]
