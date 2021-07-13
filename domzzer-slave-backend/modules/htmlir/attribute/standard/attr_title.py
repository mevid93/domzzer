from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLTitleGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global title attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        translate_str = "title=\""
        translate_str += self.value
        translate_str += "\""
        return translate_str

    @staticmethod
    def generate():
        translate = HTMLTitleGlobalAttribute()
        translate.mutate()
        return translate


POSSIBLE_VALUES = [
    "Nice attribute title",
    "Attribute title with multiline\ntext",
    "Another title for attribute",
    "Lirum larum attribute title",
    "",
    "123132132132312",
    "Title",
    "???????????????????+"
]
