from random import randint

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLTargetAttribute(HTMLAttribute):
    """ Class representing HTML document target attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        target_str = "target=\""
        target_str += self.value
        target_str += "\""
        return target_str

    @staticmethod
    def generate():
        target = HTMLTargetAttribute()
        target.mutate()
        return target


POSSIBLE_VALUES = [
    "_blank",
    "_self",
    "_parent",
    "_top",
    "framename"
]
