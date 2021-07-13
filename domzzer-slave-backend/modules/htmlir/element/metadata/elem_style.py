
import random

import modules.htmlir.attribute.utilities as autily

from modules.htmlir.attribute.optional.attr_media import HTMLMediaAttribute
from modules.htmlir.attribute.optional.attr_type import HTMLTypeAttribute
from modules.htmlir.element.abstract.elem_element import HTMLElement


class HTMLStyleElement(HTMLElement):
    """ Class representing <style> element. """

    def __init__(self, style_name, document_depth, doc_details):
        super().__init__(0, doc_details)
        self.name = style_name
        self.rules = []
        self.mutate()

    def mutate(self):
        # mutate attributes
        if len(self.attributes) == 0:
            self.attributes = autily.choose_random_attributes(
                POSSIBLE_ATTRIBUTES)
        else:
            autily.mutate_attributes(self.attributes)

        # mutate global attributes
        if len(self.global_attributes) == 0:
            self.global_attributes = autily.get_random_global_attributes()
        else:
            autily.mutate_attributes(self.global_attributes)

        # mutate css rules
        self.rules = []
        how_many = random.randint(0, 5)
        for i in range(how_many):
            rule = autily.create_random_css_class_rule()
            self.rules.append(rule)

    def convert(self):
        convert_str = "<style"
        # insert id attribute
        idattr = autily.create_id_attribute(self.element_id)
        convert_str += " " + idattr.convert()

        # insert attributes
        for a in self.attributes:
            convert_str += " " + a.convert()

        # insert global attributes
        for ga in self.global_attributes:
            convert_str += " " + ga.convert()

        convert_str += ">\n"

        # fill with css class
        convert_str += "." + self.name + " " + "{\n"
        for rule in self.rules:
            convert_str += rule + "\n"
        convert_str += "}\n"

        convert_str += "</style>"
        return convert_str

    @staticmethod
    def generate(document_depth, doc_details):
        raise NotImplementedError

    @staticmethod
    def generate_with_name(name, document_depth, doc_details):
        """ Generate new <style> element.

        Parameters
        ----------
        name: str
            css class name inside style element
        document_depth: int
            maximum distance from element to any leaf node
        doc_details:
            document details of the document where element belongs
        """
        return HTMLStyleElement(name, document_depth, doc_details)


POSSIBLE_ATTRIBUTES = [
    HTMLMediaAttribute,
    HTMLTypeAttribute,
]

POSSIBLE_CHILD_ELEMENTS = []
