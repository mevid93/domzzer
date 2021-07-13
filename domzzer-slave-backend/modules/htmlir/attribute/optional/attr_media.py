from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLMediaAttribute(HTMLAttribute):
    """ Class representing HTML media attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_OPERATORS) - 1)
        operator = POSSIBLE_OPERATORS[index]
        index = randint(0, len(POSSIBLE_DEVICES) - 1)
        device1 = POSSIBLE_DEVICES[index]
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        value = POSSIBLE_VALUES[index]
        
        if operator == "not":
            self.value = operator + " " + device1 + " " + value
        elif operator == "and" or operator == ",":
            self.value = device1 + " " + operator + " " + value

    def convert(self):
        media_str = "media=\""
        media_str += self.value
        media_str += "\""
        return media_str

    @staticmethod
    def generate():
        media = HTMLMediaAttribute()
        media.mutate()
        return media


POSSIBLE_OPERATORS = [
    "not",
    "and",
    ","
]

POSSIBLE_DEVICES = [
    "all",
    "aural",
    "braille",
    "handheld",
    "projection",
    "print",
    "screen",
    "tty",
    "tv"
]

POSSIBLE_VALUES = [
    "(width:500px)",
    "(min-width:500px)",
    "(max-width:200px)",
    "(height:500px)"
    "(min-height:700px)",
    "(max-height:800px)",
    "(device-width:500px)",
    "(min-device-width:300px)",
    "(max-device-width:400px)",
    "(device-height:500px)",
    "(min-device-height:300px)",
    "(max-device-height:400px)",
    "(orientation:portrait)",
    "(orientation:landscape)",
    "(aspect-ratio:16/9)",
    "(min-aspect-ratio:16/9)",
    "(max-aspect-ratio:16/9)",
    "(device-aspect-ratio:16/9)",
    "(min-device-aspect-ratio:16/9)",
    "(max-device-aspect-ratio:16/9)",
    "(color:3)",
    "(min-color:3)",
    "(mac-color:3)",
    "(color-index:256)",
    "(min-color-index:256)",
    "(max-color-index:256)",
    "(monochrome:2)",
    "(min-monochrome:2)",
    "(max-monochrome:2)",
    "(resolution:300dpi)",
    "(min-resolution:300dpi)",
    "(max-resolution:300dpi)",
    "(scan:interlace)",
    "(scan:progressive)",
    "(grid:1)",
    "(grid:0)"
]
