from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLDraggableGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global draggable attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        draggable_str = "draggable=\""
        draggable_str += self.value
        draggable_str += "\""
        return draggable_str

    @staticmethod
    def generate():
        draggable = HTMLDraggableGlobalAttribute()
        draggable.mutate()
        return draggable


POSSIBLE_VALUES = [
    "false",
    "true"
]
