from random import randint

from modules.htmlir.attribute.profile import HTMLProfileAttribute
from modules.htmlir.element.base import HTMLBaseElement
from modules.htmlir.element.element import HTMLElement
from modules.htmlir.element.link import HTMLLinkElement
from modules.htmlir.element.meta import HTMLMetaElement
from modules.htmlir.element.noscript import HTMLNoscriptElement
from modules.htmlir.element.script import HTMLScriptElement
from modules.htmlir.element.style import HTMLStyleElement
from modules.htmlir.element.template import HTMLTemplateElement
from modules.htmlir.element.title import HTMLTitleElement
from modules.htmlir.attribute.gglobal.attributes import get_random_global_attributes


class HTMLHeadElement(HTMLElement):
    """ Class representing HTML document head element.

    HTML head element can have one attribute (profile) and eight
    different child elements. 

    Attributes
    ----------
    document_depth: int
        Length of the longest path from element to any leaf node
    includes_global_attributes: boolean
        Does the element include the global attributes
    child_elements: list
        List of child elements
    attributes: list
        List of element attributes
    global_attributes: list
        List of global element attributes
    """

    def __init__(self, document_depth):
        """ Constructor for HTMLElementHead object.

        Parameters
        ----------
        document_depth: int
            Length of the longest path from element to any leaf node
        """
        if document_depth == None:
            raise ValueError
        if not isinstance(document_depth, int):
            raise TypeError
        self.document_depth = document_depth
        self.document_depth = 0
        self.attributes = []
        self.includes_global_attributes = True
        self.global_attributes = []
        self.child_elements = []
        self.mutate()

    def get_child_elements(self):
        return self.child_elements

    def get_attributes(self):
        return self.attributes

    def get_text(self):
        return None

    def mutate(self):
        # first handle the attributes
        number_of_attributes = randint(0, len(LIST_OF_POSSIBLE_ATTRIBUTES))
        copy_of_possible_attributes = LIST_OF_POSSIBLE_ATTRIBUTES.copy()
        new_attributes = []
        for i in range(number_of_attributes):
            index = randint(0, len(copy_of_possible_attributes) - 1)
            attribute_type = copy_of_possible_attributes[index]
            existing = False
            for old_attribute in self.attributes:
                if isinstance(old_attribute, attribute_type):
                    old_attribute.mutate()
                    new_attributes.append(old_attribute)
                    existing = True
                    break
            if not existing:
                new_attributes.append(attribute_type.generate())
            del copy_of_possible_attributes[index]
        self.attributes = new_attributes
        self.global_attributes = get_random_global_attributes()

        if self.document_depth <= 0:
            return

        # then handle the child elements
        number_of_elements = randint(0, len(LIST_OF_POSSIBLE_CHILD_ELEMENTS))
        copy_of_possible_elements = LIST_OF_POSSIBLE_CHILD_ELEMENTS.copy()
        new_elements = []
        for i in range(number_of_elements):
            index = randint(0, len(copy_of_possible_elements) - 1)
            element_type = copy_of_possible_elements[index]
            existing = False
            for old_element in self.child_elements:
                if isinstance(old_element, element_type):
                    old_element.mutate()
                    new_elements.append(old_element)
                    existing = True
                    break
            if not existing:
                new_elements.append(
                    element_type.generate(self.document_depth - 1))
            del copy_of_possible_elements[index]
        self.child_elements = new_elements

    def add_css(self):
        raise NotImplementedError

    def convert(self):
        head_str = "<head"
        for attribute in self.attributes:
            head_str += " " + attribute.convert()
        for attribute in self.global_attributes:
            head_str += " " + attribute.convert()
        head_str += ">\n"
        for element in self.child_elements:
            head_str += element.convert() + "\n"
        head_str += "</head>"
        return head_str

    @staticmethod
    def generate(document_depth):
        if document_depth == None:
            raise ValueError
        if not isinstance(document_depth, int):
            raise TypeError
        head = HTMLHeadElement(document_depth)
        return head


# list of child elements that can be used for <head> element
LIST_OF_POSSIBLE_CHILD_ELEMENTS = [
    HTMLTitleElement,
    HTMLBaseElement,
    # HTMLLinkElement,
    # HTMLStyleElement,
    # HTMLMetaElement,
    # HTMLScriptElement,
    # HTMLNoscriptElement,
    # HTMLTemplateElement
]

# list of attributes that can be used for <head> element
LIST_OF_POSSIBLE_ATTRIBUTES = [
    HTMLProfileAttribute
]
