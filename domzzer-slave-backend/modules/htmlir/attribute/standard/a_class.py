from random import randint

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLClassGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global class attribute. """

    def __init__(self, classes):
        """ Constructor for HTMLClassGlobalAttribute.

        Method constructs new HTMLClassGlobalAttribute object with given class names.

        Parameters
        ----------
        classes: list[str],
            Class names names for attribute
        """
        if classes == None:
            raise ValueError
        if not isinstance(classes, list):
            raise TypeError
        self.classes = classes

    def mutate(self):
        pass

    def convert(self):
        class_str = "class=\"" + " ".join(self.classes) + "\""
        return class_str

    @staticmethod
    def generate():
        pass
