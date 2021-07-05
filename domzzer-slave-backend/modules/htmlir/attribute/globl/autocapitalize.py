from random import randint

from modules.htmlir.attribute.attribute import HTMLAttribute


class HTMLAutocapitalizeGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global autocapitalize attribute.

    Attributes
    ----------
    value: str, optional
        Attribute value (default is False)
    """

    def __init__(self, value="off"):
        """ Constructor for HTMLAutocapitalizeGlobalAttribute object.

        Parameters
        ----------
        value: str, optional
            Autocapitalize attribute value (default is off)
        """
        self.value = "off"
        if value != None:
            if not isinstance(value, str):
                raise TypeError
            self.value = value

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        autocapitalize_str = "autocapitalize=\""
        autocapitalize_str += self.value
        autocapitalize_str += "\""
        return autocapitalize_str

    @staticmethod
    def generate():
        autocapitalize = HTMLAutocapitalizeGlobalAttribute()
        autocapitalize.mutate()
        return autocapitalize


# hardcoded list of values
POSSIBLE_VALUES = [
    "off",
    "none",
    "on",
    "sentences",
    "words",
    "characters"
]
