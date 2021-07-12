from abc import ABC, abstractmethod

from modules.htmlir.document import HTMLDocument
from modules.htmlir.other.details import HTMLDocumentDetails


class HTMLElement(ABC):
    """ Abstract element base class.

    Abstract base class that must be inherited by all elements.
    Defines multiple methods that must be implemented.

    Attributes
    ----------
    document_depth: int
        Length of the longest path from element to any leaf node
    attributes: list
        List of global attributes
    global_attributes: list
        List of element's global attributes
    child_elements: list
        List of element's child elements
    element_id: str
        Unique id for each element in the document
    classes: list[str]
        List of css classes names that are used by the element
    text: 
        Text of the element (if text is supported)
    document: HTMLDocument
        Document where element belongs

    Methods
    -------
    get_child_elements()
        Returns list of child elements
    get_attributes()
        Returns list of attributes
    get_global_attributes()
        Returns list of global attributes
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
    def __init__(self, document_depth, doc_details):
        """ Constructor for HTMLElement object.

        Parameters
        ----------
        document_depth: int
            Length of the longest path from element to any leaf node
        doc_details: HTMLDocumentDetails
            Details of the HTMLDocumentDetails where elements will belong
        """
        # first check that parameters are valid
        if document_depth == None:
            raise ValueError
        if not isinstance(document_depth, int):
            raise TypeError
        if doc_details == None:
            raise ValueError
        if not isinstance(doc_details, HTMLDocumentDetails):
            raise TypeError

        # then initialize attributes
        self.document_depth = document_depth
        self.details = doc_details
        self.element_id = self.details.get_next_id()
        self.child_elements = []
        self.attributes = []
        self.global_attributes = []
        self.classes = self.details.get_random_css_classes()
        self.text = None

    def get_child_elements(self):
        """ Get list of child elements.

        Returns
        -------
        list
            List of all child elements of element
        """
        return self.child_elements

    def get_attributes(self):
        """ Get list of all attributes.

        Returns
        -------
        list
            List of all attributes
        """
        return self.attributes

    def get_global_attributes(self):
        """ Get list of global attributes.

        Returns
        -------
        list
            List of all global attributes of element
        """
        return self.global_attributes

    def get_text(self):
        """ Get text from HTML element.

        Some HTML elements can display text. This method returns
        text if element supports it, and it is defined.

        Returns
        -------
        str
            Text of HTML element
        """
        return self.text

    @abstractmethod
    def mutate(self):
        """ Randomly mutate the element. """
        raise NotImplementedError

    @abstractmethod
    def convert(self):
        """ Convert the element into HTML code.

        Method converts the element into HTML code and retuns it as string.

        Returns
        -------
        str
            Converted HTML code
        """
        raise NotImplementedError

    @staticmethod
    @abstractmethod
    def generate(document_depth, doc_details):
        """ Generate random instance of element.

        Method generates random element instance and returns it.

        Parameters
        ----------
        document_depth: int
            Length of the longest path from element to any leaf node
        doc_details: HTMLDocumentDetails
            Details of the HTMLDocumentDetails where elements will belong

        Returns
        -------
        HTMLElement
            Randomly generated element
        """
        raise NotImplementedError
