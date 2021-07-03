from random import randint

from modules.htmlir.element.element import HTMLElement


class HTMLTitleElement(HTMLElement):
    """ Class representing HTML title element

    This class represents HTML <title> element. 
    HTML title is an element that can be used as child element of <head> element.

    Attributes
    ----------
    document_depth: int
        Length of the longest path from element to any leaf node
    text: str
        Title text
    """

    def __init__(self, document_depth):
        """ Constructor for HTMLTitleElement object.

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
        self.text = ""
        self.mutate()

    def get_child_elements(self):
        return []

    def get_attributes(self):
        return []

    def get_text(self):
        return self.text

    def mutate(self):
        index = randint(0, len(LIST_OF_POSSIBLE_TEXTS) - 1)
        self.text = LIST_OF_POSSIBLE_TEXTS[index]

    def convert(self):
        title_str = "<title>"
        title_str += self.text
        title_str += "</title>"
        return title_str

    @staticmethod
    def generate(document_depth):
        if document_depth == None:
            raise ValueError
        if not isinstance(document_depth, int):
            raise TypeError
        title = HTMLTitleElement(document_depth)
        return title


# hard coded list of possible elements
LIST_OF_POSSIBLE_TEXTS = [
    "DOMZZER_TITLE",
    "?????????????",
    "12321321321321",
    "https://github.com/mevid93/domzzer"
    ""
]
