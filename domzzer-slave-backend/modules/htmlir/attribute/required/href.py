from random import randint

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLHrefAttribute(HTMLAttribute):
    """ Class representing HTML document href attribute."""

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        href_str = "href=\""
        href_str += self.value
        href_str += "\""
        return href_str

    @staticmethod
    def generate():
        href = HTMLHrefAttribute()
        href.mutate()
        return href


POSSIBLE_VALUES = [
    "https://localhost:3002/unknown",
    ""
]
