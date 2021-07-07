from random import randint

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLItempropGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global itemprop attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        itemprop_str = "itemprop=\""
        itemprop_str += self.value
        itemprop_str += "\""
        return itemprop_str

    @staticmethod
    def generate():
        itemprop = HTMLItempropGlobalAttribute()
        itemprop.mutate()
        return itemprop


POSSIBLE_VALUES = [
    "name",
    "age",
    "type",
    "origin",
]
