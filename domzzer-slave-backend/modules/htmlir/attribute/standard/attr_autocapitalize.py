from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLAutocapitalizeGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global autocapitalize attribute. """

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


POSSIBLE_VALUES = [
    "off",
    "none",
    "on",
    "sentences",
    "words",
    "characters"
]
