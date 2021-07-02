from random import randint

from modules.htmlir.attribute.attribute import HTMLAttribute


class HTMLTargetAttribute(HTMLAttribute):
    """ Class representing HTML document target attribute.

    Attributes
    ----------
    value: str, optional
        Attribute value (default is None)
    """

    def __init__(self, value=None):
        """ Constructor for HTMLTargetAttribute object.

        Parameters
        ----------
        value: str, optional
            Target attribute value (default is None)
        """
        self.value = None
        if value != None:
            if not isinstance(value, str):
                raise TypeError
            self.value = value

    def mutate(self):
        index = randint(0, len(POSSIBLE_TARGET_VALUES) - 1)
        self.value = POSSIBLE_TARGET_VALUES[index]

    def convert(self):
        target_str = "target=\""
        target_str += self.value if self.value != None else ""
        target_str += "\""
        return target_str

    @staticmethod
    def generate():
        target = HTMLTargetAttribute()
        target.mutate()
        return target


# hardcoded list of target values
POSSIBLE_TARGET_VALUES = [
    "_blank",
    "_self",
    "_parent",
    "_top",
    "framename"
]
