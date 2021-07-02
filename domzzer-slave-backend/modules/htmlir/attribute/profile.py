from random import randint


class HTMLProfileAttribute:
    """ Class representing HTML document profile attribute of head element.

    HTML head element can have one attribute (profile) and this class represents
    that attribute.

    Attributes
    ----------
    value: str, optional
        Attribute value (default is None)

    Methods
    -------
    mutate()
        Mutates the HTMLProfileAttribute
    convert()
        Converts HTMLProfileAttribute into real HTML code

    Static methods
    --------------
    generate()
        Generates random HTMLProfileAttribute object and returns it
    """

    def __init__(self, value=None):
        """ Constructor for HTMLProfileAttribute object.

        Parameters
        ----------
        value: str, optional
            Profile attribute value (default is None)
        """
        self.value = None
        if value != None:
            if not isinstance(value, str):
                raise TypeError
            self.value = value

    def mutate(self):
        """ Randomly mutate the HTMLProfileAttribute object."""
        index = randint(0, len(POSSIBLE_PROFILE_VALUES) - 1)
        self.value = POSSIBLE_PROFILE_VALUES[index]

    def convert(self):
        """ Returns HTMLProfileAttribute as string.

        This method converts HTMLProfileAttribute object into real HTML code.

        Returns
        -------
        str
            a string of real HTML code
        """
        profile_str = "profile=\"" + self.value + "\""
        return profile_str

    @staticmethod
    def generate():
        """ Generates random HTMLProfileAttribute.

         Method generates random HTMLProfileAttribute object and returns it.

         Returns
         -------
         HTMLProfileAttribute
             Randomly generated profile attribute
         """
        profile = HTMLProfileAttribute()
        profile.mutate()
        return profile


# list of random hardcoded profile values
POSSIBLE_PROFILE_VALUES = [
    "http://localhost:3002/profiles/core",
    "http://localhost:3002/documents/2008/08/04/dc-html/",
    "http://localhost:3002/xfn/11",
    "http://localhost:3002/profiles/meta",
    "???????????????????????????",
    "111111111111111111111111111",
    "dont know what im doing",
    "",
]
