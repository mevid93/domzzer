from random import randint

from modules.htmlir.attribute.attribute import HTMLAttribute


class HTMLSpellcheckGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global spellcheck attribute.

    Attributes
    ----------
    value: str, optional
        Attribute value (default is False)
    """

    def __init__(self, value=False):
        """ Constructor for HTMLSpellcheckGlobalAttribute object.

        Parameters
        ----------
        value: str, optional
            Spellcheck attribute value (default is False)
        """
        self.value = False
        if value != None:
            if not isinstance(value, bool):
                raise TypeError
            self.value = value

    def mutate(self):
        index = randint(0, 1)
        self.value = True if index == 1 else False

    def convert(self):
        spellcheck_str = "spellcheck=\""
        spellcheck_str += "false" if self.value == False else "true"
        spellcheck_str += "\""
        return spellcheck_str

    @staticmethod
    def generate():
        spellcheck = HTMLSpellcheckGlobalAttribute()
        spellcheck.mutate()
        return spellcheck
