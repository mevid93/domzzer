from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLTranslateGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global translate attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        translate_str = "translate=\""
        translate_str += self.value
        translate_str += "\""
        return translate_str

    @staticmethod
    def generate():
        translate = HTMLTranslateGlobalAttribute()
        translate.mutate()
        return translate


POSSIBLE_VALUES = [
    "",
    "yes",
    "no"
]
