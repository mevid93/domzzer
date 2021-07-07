from random import randint

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLContenteditableGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global contenteditable attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        if self.value == "":
            return "contenteditable"
        contenteditable_str = "contenteditable=\""
        contenteditable_str += self.value
        contenteditable_str += "\""
        return contenteditable_str

    @staticmethod
    def generate():
        inputmode = HTMLContenteditableGlobalAttribute()
        inputmode.mutate()
        return inputmode


POSSIBLE_VALUES = [
    "",
    "true",
    "false",
]
