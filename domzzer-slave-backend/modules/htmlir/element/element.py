from abc import ABC, abstractmethod


class HTMLElement(ABC):
    """ Abstract element base class.

    Abstract base class that must be inherited by all elements.
    Defines multiple methods that must be implemented.

    Methods
    -------
    get_child_elements()
        Returns list of child elements
    get_attributes()
        Returns list of attributes
    get_text()
        Returns text of HTML element
    mutate()
        Randomly mutates the element
    convert()
        Converts the element into real HTML code

    Static methods
    --------------
    generate()
        Generates random instance of element
    """

    @abstractmethod
    def get_child_elements(self):
        """ Get list of child elements

        Returns
        -------
        list
            List of all child elements of element
        """
        raise NotImplementedError

    @abstractmethod
    def get_attributes(self):
        """ Get list of all attributes

        Returns
        -------
        list
            List of all attributes
        """
        raise NotImplementedError

    @abstractmethod
    def get_text(self):
        """ Get text from HTML element

        Some HTML elements can display text. This method returns
        text if element has text.

        Returns
        -------
        str
            Text of HTML element
        """

    @abstractmethod
    def mutate(self):
        """ Randomly mutate the element """
        raise NotImplementedError

    @abstractmethod
    def convert(self):
        """ Convert the element into HTML code

        Method converts the element into HTML code and retuns it as string.

        Returns
        -------
        str
            Converted HTML code
        """
        raise NotImplementedError

    @staticmethod
    @abstractmethod
    def generate():
        """ Generate random instance of element

        Method generates random element instance and returns it.

        Returns
        -------
        Element
            Randomly generated element
        """
        raise NotImplementedError
