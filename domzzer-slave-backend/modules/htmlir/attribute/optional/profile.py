from random import randint

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLProfileAttribute(HTMLAttribute):
    """ Class representing HTML document profile attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        profile_str = "profile=\""
        profile_str += self.value
        profile_str += "\""
        return profile_str

    @staticmethod
    def generate():
        profile = HTMLProfileAttribute()
        profile.mutate()
        return profile


POSSIBLE_VALUES = [
    "http://localhost:3002/profiles/core",
    "http://localhost:3002/documents/2008/08/04/dc-html/",
    "http://localhost:3002/xfn/11",
    "http://localhost:3002/profiles/meta",
    "???????????????????????????",
    "111111111111111111111111111",
    "dont know what im doing",
    "",
]
