from abc import ABC, abstractmethod


class HTMLElement(ABC):
    """ Abstract element base class.

    Abstract base class that must be inherited by all elements.
    Defines multiple methods that must be implemented.

    Attributes
    ----------
    document_depth: int
        Length of the longest path from element to any leaf node
    includes_global_attributes: boolean
        Does the element include the global attributes

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
    add_css()
        Inserts random css rules for element
    convert()
        Converts the element into real HTML code

    Static methods
    --------------
    generate()
        Generates random instance of element
    """
    @abstractmethod
    def __init__(self, document_depth):
        if document_depth == None:
            raise ValueError
        if not isinstance(document_depth, int):
            raise TypeError
        self.document_depth = document_depth
        self.includes_global_attributes = True

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
        text if element supports it, and it is defined.

        Returns
        -------
        str
            Text of HTML element
        """
        raise NotImplementedError

    @abstractmethod
    def mutate(self):
        """ Randomly mutate the element """
        raise NotImplementedError

    @abstractmethod
    def add_css(self):
        """ Inserts random css rules for element """
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
    def generate(document_depth):
        """ Generate random instance of element

        Method generates random element instance and returns it.

        Parameters
        ----------
        document_depth: int
            Length of the longest path from element to any leaf node

        Returns
        -------
        Element
            Randomly generated element
        """
        raise NotImplementedError
