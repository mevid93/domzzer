import random

import modules.htmlir.attribute.utilities as autily
import modules.htmlir.element.utilities as eutily

from modules.htmlir.element.abstract.element import HTMLElement


class HTMLHeadElement(HTMLElement):
    """ Class representing <head> element. """

    def __init__(self, document_depth, doc_details):
        super().__init__(0, doc_details)

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

        # mutate child elements
        if (len(self.child_elements) == 0):
            self.child_elements = eutily.choose_random_elements(
                POSSIBLE_CHILD_ELEMENTS, 0, self.details)
        else:
            eutily.mutate_elements(self.child_elements)

    def convert(self):
        convert_str = "<head"
        # insert id attribute
        idattr = autily.create_id_attribute(self.element_id)
        convert_str += " " + idattr.convert()

        # insert class attribute
        if len(self.classes) > 0:
            classattr = autily.create_class_attribute(self.classes)
            convert_str += " " + classattr.convert()

        # insert attributes
        for a in self.attributes:
            convert_str += " " + a.convert()

        # insert global attributes
        for ga in self.global_attributes:
            convert_str += " " + ga.convert()

        convert_str += ">\n"
        #insert child elements
        for e in self.child_elements:
            convert_str += e.convert() + "\n"

        convert_str += "</head>"
        return convert_str

    @staticmethod
    def generate(document_depth, doc_details):
        return HTMLHeadElement(document_depth, doc_details)


POSSIBLE_ATTRIBUTES = [

]

POSSIBLE_CHILD_ELEMENTS = [

]
