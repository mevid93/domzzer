from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLInputmodeGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global inputmode attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        inputmode_str = "inputmode=\""
        inputmode_str += self.value
        inputmode_str += "\""
        return inputmode_str

    @staticmethod
    def generate():
        inputmode = HTMLInputmodeGlobalAttribute()
        inputmode.mutate()
        return inputmode


POSSIBLE_VALUES = [
    "none",
    "text",
    "decimal",
    "numeric",
    "tel",
    "search",
    "email",
    "url"
]
