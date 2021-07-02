from abc import ABC, abstractmethod


class HTMLAttribute(ABC):
    """ Abstract attribute base class.

    Abstract base class that must be inherited by all attributes.
    Defines multiple methods that must be implemented.

    Methods
    -------
    mutate()
        Randomly mutates the attribute
    convert()
        Converts the attribute into real HTML code

    Static methods
    --------------
    generate()
        Generates random instance of attribute
    """

    @abstractmethod
    def mutate(self):
        """ Randomly mutate the attribute """
        raise NotImplementedError

    @abstractmethod
    def convert(self):
        """ Convert the attribute into HTML code

        Method converts the attribute into HTML code and retuns it as string.

        Returns
        -------
        str
            Converted HTML code
        """
        raise NotImplementedError

    @staticmethod
    @abstractmethod
    def generate():
        """ Generate random instance of attribute

        Method generates random attribute instance and returns it.

        Returns
        -------
        Element
            Randomly generated attribute
        """
        raise NotImplementedError
