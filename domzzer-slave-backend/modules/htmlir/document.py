import copy
import random

from modules.htmlir.other.details import HTMLDocumentDetails
from modules.htmlir.other.doctype import HTMLDoctype


class HTMLDocument:
    """ Class representing HTML document.

    Attributes
    ----------
    document_depth: int
        Length of the longest path to any leaf node from root
    document_id: str
        HTML document id for identification

    Methods
    -------
    mutate()
        Mutates the HTMLDocument
    add_scripts()
        Add dom manipulation scripts
    convert()
        Converts HTMLDocument object into real HTML code
    get_next_element_id()
        Returns next available element id
    get_css_classes()
        Returns random list of available css class names

    Statis methods
    --------------
    generate()
        Generates new random HTML document
    """

    def __init__(self, document_depth, document_id):
        """ Constructor for HTMLDocument object.

        Parameters
        ----------
        document_depth: int
            Document depth, i.e. length of longest path to any leaf node from root node
        document_id: str
            Document id for identification
        """
        # set arguments to attributes
        if document_depth == None or document_id == None:
            raise ValueError
        if not isinstance(document_id, str):
            raise TypeError
        if not isinstance(document_depth, int):
            raise TypeError
        self.document_depth = document_depth
        self.document_id = document_id

        # create object to hold document details
        self.details = HTMLDocumentDetails()

        # set other attributes
        self.doctype = None
        self.head = None
        self.body = None

        # and finally mutate to get content
        self.mutate()

    def mutate(self):
        """ Randomly mutate the HTMLDocument. """
        if self.doctype != None:
            self.doctype.mutate()
        else:
            self.doctype = HTMLDoctype.generate()

    def convert(self):
        document_str = self.doctype.convert()
        return document_str

    @staticmethod
    def generate(document_depth, document_id):
        document = HTMLDocument(document_depth, document_id)
        return document
