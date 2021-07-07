from random import randint

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLEnterkeyhintGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global enterkeyhint attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        enterkeyhint_str = "enterkeyhint=\""
        enterkeyhint_str += self.value
        enterkeyhint_str += "\""
        return enterkeyhint_str

    @staticmethod
    def generate():
        enterkeyhint = HTMLEnterkeyhintGlobalAttribute()
        enterkeyhint.mutate()
        return enterkeyhint


POSSIBLE_VALUES = [
    "enter",
    "done",
    "go",
    "next",
    "previous",
    "search",
    "send"
]
