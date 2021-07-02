from random import randint

from modules.htmlir.attribute.attribute import HTMLAttribute


class HTMLHrefAttribute(HTMLAttribute):
    """ Class representing HTML document href attribute.

    Attributes
    ----------
    value: str, optional
        Attribute value (default is None)
    """

    def __init__(self, value=None):
        """ Constructor for HTMLHrefAttribute object.

        Parameters
        ----------
        value: str, optional
            Href attribute value (default is None)
        """
        self.value = None
        if value != None:
            if not isinstance(value, str):
                raise TypeError
            self.value = value

    def mutate(self):
        index = randint(0, len(POSSIBLE_HREF_VALUES) - 1)
        self.value = POSSIBLE_HREF_VALUES[index]

    def convert(self):
        href_str = "href=\""
        href_str += self.value if self.value != None else ""
        href_str += "\""
        return href_str

    @staticmethod
    def generate():
        href = HTMLHrefAttribute()
        href.mutate()
        return href


# hardcoded list of href values
POSSIBLE_HREF_VALUES = [
    "https://localhost:3002/unknown",
    ""
]
