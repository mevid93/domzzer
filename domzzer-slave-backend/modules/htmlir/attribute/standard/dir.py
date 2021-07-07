from random import randint

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLDirGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global dir attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        dir_str = "dir=\""
        dir_str += self.value
        dir_str += "\""
        return dir_str

    @staticmethod
    def generate():
        dirga = HTMLDirGlobalAttribute()
        dirga.mutate()
        return dirga


POSSIBLE_VALUES = [
    "ltr",
    "rtl",
    "auto"
]
