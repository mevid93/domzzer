from random import randint

from modules.htmlir.attribute.href import HTMLHrefAttribute
from modules.htmlir.attribute.target import HTMLTargetAttribute
from modules.htmlir.element.element import HTMLElement


class HTMLBaseElement(HTMLElement):
    """ Class representing HTML base element

    This class represents HTML <base> element.
    HTML <base> is an element that can be used as child element of <head> element.

    """

    def __init__(self, target_attribute=None, href_attribute=None):
        """ Constructor for HTMLBaseElement object.

        Parameters
        ----------
        target_attribute: HTMLTargetAttribute, optional
            target attribute (default is None)
        href_attribute: HTMLHrefAttribute, optional
            href attribute (default is None)
        """
        self.target = None
        self.href = None
        if target_attribute != None:
            if not isinstance(target_attribute, HTMLTargetAttribute):
                raise TypeError
            self.target = target_attribute
        if href_attribute != None:
            if not isinstance(href_attribute, HTMLHrefAttribute):
                raise TypeError
            self.href = href_attribute

    def get_child_elements(self):
        return []

    def get_attributes(self):
        attributes = []
        if self.target != None:
            attributes.append(self.target)
        if self.href != None:
            attributes.append(self.href)
        return attributes

    def get_text(self):
        return None

    def mutate(self):
        number_of_attributes = randint(1, 2)
        possible_attributes = [
            "target",
            "href",
        ]

        self.target = None
        self.href = None

        for x in range(number_of_attributes):
            index = randint(0, len(possible_attributes)-1)
            value = possible_attributes[index]
            if value == "target":
                self.target = HTMLTargetAttribute.generate()
            elif value == "href":
                self.element_base = HTMLHrefAttribute.generate()
            del possible_attributes[index]

    def convert(self):
        base_str = "<base"
        if self.target != None:
            base_str += " " + self.target.convert()
        if self.href != None:
            base_str += " " + self.href.convert()
        base_str += ">"
        return base_str

    @staticmethod
    def generate():
        base = HTMLBaseElement()
        base.mutate()
        return base
