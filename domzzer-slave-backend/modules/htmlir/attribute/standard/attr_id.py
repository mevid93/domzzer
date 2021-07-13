from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLIdGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global id attribute. """

    def __init__(self, id):
        """ Constructor for HTMLIdGlobalAttribute.

        Method constructs new HTMLIdGlobalAttribute object with given id value.

        Parameters
        ----------
        id: str,
            Id attribute value
        """
        if id == None:
            raise ValueError
        if not isinstance(id, str):
            raise TypeError
        self.id = id

    def mutate(self):
        pass

    def convert(self):
        return "id=\"" + self.id + "\""

    @staticmethod
    def generate():
        pass
