from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLHiddenGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global hidden attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        if self.value == "yes":
            return "hidden"
        return ""

    @staticmethod
    def generate():
        translate = HTMLHiddenGlobalAttribute()
        translate.mutate()
        return translate


POSSIBLE_VALUES = [
    "yes",
    "no"
]
