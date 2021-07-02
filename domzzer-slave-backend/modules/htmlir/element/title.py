from random import randint

from modules.htmlir.element.element import HTMLElement


class HTMLTitleElement(HTMLElement):
    """ Class representing HTML title element

    This class represents HTML <title> element. 
    HTML title is an element that can be used as child element of <head> element.

    Attributes
    ----------
    text: str
        Text of the HTML element 
    """

    def __init__(self, title_text=None):
        """ Constructor for HTMLTitleLement object.

        Parameters
        ----------
        title_text: str
            Text for title element
        """
        self.text = None
        if title_text != None:
            if not isinstance(title_text, str):
                raise TypeError
            self.text = title_text

    def get_child_elements(self):
        return []

    def get_attributes(self):
        return []

    def get_text(self):
        return self.text

    def mutate(self):
        index = randint(0, len(POSSIBLE_TITLES) - 1)
        self.text = POSSIBLE_TITLES[index]

    def convert(self):
        title_str = "<title>"
        title_str += self.text if self.text != None else ""
        title_str += "</title>"
        return title_str

    @staticmethod
    def generate():
        title = HTMLTitleElement()
        title.mutate()
        return title


# list of possible hard coded elements
POSSIBLE_TITLES = [
    "DOMZZER_TITLE",
    "?????????????",
    ""
]
