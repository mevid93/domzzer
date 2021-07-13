from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLSpellcheckGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global spellcheck attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        spellcheck_str = "spellcheck=\""
        spellcheck_str += self.value
        spellcheck_str += "\""
        return spellcheck_str

    @staticmethod
    def generate():
        spellcheck = HTMLSpellcheckGlobalAttribute()
        spellcheck.mutate()
        return spellcheck


POSSIBLE_VALUES = [
    "false",
    "true"
]
