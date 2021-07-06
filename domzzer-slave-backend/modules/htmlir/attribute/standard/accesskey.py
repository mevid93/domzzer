from random import randint

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLAccesskeyGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global accesskey attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        accesskey_str = "accesskey=\""
        accesskey_str += self.value
        accesskey_str += "\""
        return accesskey_str

    @staticmethod
    def generate():
        accesskey = HTMLAccesskeyGlobalAttribute()
        accesskey.mutate()
        return accesskey


POSSIBLE_VALUES = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
]
