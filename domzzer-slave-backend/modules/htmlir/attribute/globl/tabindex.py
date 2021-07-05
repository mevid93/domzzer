from random import randint

from modules.htmlir.attribute.attribute import HTMLAttribute


class HTMLTabindexGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global tabindex attribute.

    Attributes
    ----------
    value: str, optional
        Attribute value (default is empty string)
    """

    def __init__(self, value=""):
        """ Constructor for HTMLTabindexGlobalAttribute object.

        Parameters
        ----------
        value: str, optional
            Tabindex attribute value (default is empty string)
        """
        self.value = ""
        if value != None:
            if not isinstance(value, str):
                raise TypeError
            self.value = value

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        translate_str = "tabindex=\""
        translate_str += self.value if self.value != None else ""
        translate_str += "\""
        return translate_str

    @staticmethod
    def generate():
        translate = HTMLTabindexGlobalAttribute()
        translate.mutate()
        return translate


# hardcoded list of values
POSSIBLE_VALUES = [
    "-1",
    "",
    "0",
    "11",
    "23",
    "1993",
    "1337",
    "9000",
    "32767"
]
