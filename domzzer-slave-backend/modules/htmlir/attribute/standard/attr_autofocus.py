from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLAutofocusGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global autofocus attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        if self.value == "true":
            return "autofocus"
        return ""

    @staticmethod
    def generate():
        autofocus = HTMLAutofocusGlobalAttribute()
        autofocus.mutate()
        return autofocus


POSSIBLE_VALUES = [
    "false",
    "true"
]
