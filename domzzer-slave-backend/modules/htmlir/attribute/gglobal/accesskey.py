from random import randint

from modules.htmlir.attribute.attribute import HTMLAttribute


class HTMLAccesskeyGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global accesskey attribute.

    Attributes
    ----------
    value: str, optional
        Attribute value (default is None)
    """

    def __init__(self, value=None):
        """ Constructor for HTMLAccesskeyAttribute object.

        Parameters
        ----------
        value: str, optional
            Accesskey attribute value (default is None)
        """
        self.value = None
        if value != None:
            if not isinstance(value, str):
                raise TypeError
            self.value = value

    def mutate(self):
        index = randint(0, len(POSSIBLE_ACCESSKEY_VALUES) - 1)
        self.value = POSSIBLE_ACCESSKEY_VALUES[index]

    def convert(self):
        accesskey_str = "accesskey=\""
        accesskey_str += self.value if self.value != None else ""
        accesskey_str += "\""
        return accesskey_str

    @staticmethod
    def generate():
        accesskey = HTMLAccesskeyGlobalAttribute()
        accesskey.mutate()
        return accesskey


# hardcoded list of href values
POSSIBLE_ACCESSKEY_VALUES = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
]
