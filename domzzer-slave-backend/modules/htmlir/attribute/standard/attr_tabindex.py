from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLTabindexGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global tabindex attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        translate_str = "tabindex=\""
        translate_str += self.value
        translate_str += "\""
        return translate_str

    @staticmethod
    def generate():
        translate = HTMLTabindexGlobalAttribute()
        translate.mutate()
        return translate


POSSIBLE_VALUES = [
    "-1",
    "",
    "0",
    "11",
    "23",
    "1993",
    "1337",
    "9000",
    "32767"
]
