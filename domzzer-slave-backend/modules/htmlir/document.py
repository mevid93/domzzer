from modules.htmlir.doctype import HTMLDoctype
from modules.htmlir.element.body import HTMLBodyElement
from modules.htmlir.element.head import HTMLHeadElement


class HTMLDocument:
    """ Class representing HTML document.

    Attributes
    ----------
    doctype: HTMLDoctype
        HTML document type declaration
    head: HTMLHeadElement
        HTML document head
    body: HTMLBodyElement
        HTML document body
    document_id: str
        HTML document id for identification

    Methods
    -------
    mutate()
        Mutates the HTMLDocument
    convert()
        Converts HTMLDocument object into real HTML code
    """

    def __init__(self, document_depth=5, doctype=None, head=None,
                 body=None, document_id=None):
        """ Constructor for HTMLDocument object.

        Parameters
        ----------
        document_depth: int, optional
            Document depth, i.e. length of longest path to any leaf node from root node
        doctype: HTMLDoctype, optional
            HTML document type declaration (default is None)
        head: HTMLHeadElement, optional
            HTML document head element (default is None)
        body: HTMLBodyElement, optional
            HTML document body element (default is None)
        document_id: str, optional
            Document id for identification (defaul is None)
        """
        if document_depth == None:
            raise ValueError
        if not isinstance(document_depth, int):
            raise TypeError
        self.document_depth = document_depth
        if doctype != None and not isinstance(doctype, HTMLDoctype):
            raise TypeError
        self.doctype = doctype
        if head != None and not isinstance(head, HTMLHeadElement):
            raise TypeError
        self.head = head
        if body != None and not isinstance(body, HTMLBodyElement):
            raise TypeError
        self.body = body
        if document_id != None and not isinstance(document_id, str):
            raise TypeError
        self.document_id = document_id

    def mutate(self):
        """ Mutate the HTMLDocument

        Method randomly mutates the HTMLDocument.
        """
        if self.document_depth <= 0:
            self.doctype = None
            self.head = None
            self.body = None
            return

        if self.doctype != None:
            self.doctype.mutate()
        else:
            self.doctype = HTMLDoctype.generate(self.document_depth - 1)
        if self.head != None:
            self.head.mutate()
        else:
            self.head = HTMLHeadElement.generate(self.document_depth - 1)
        if self.body != None:
            self.body.mutate()
        else:
            self.body = HTMLBodyElement.generate(self.document_depth - 1)
        self.add_css()
        self.add_scripts()

    def add_css(self):
        raise NotImplementedError

    def add_scripts(self):
        raise NotImplementedError

    def convert(self):
        raise NotImplementedError

    @staticmethod
    def generate(document_depth=5, document_id=None):
        doctype = HTMLDoctype.generate()
        head = HTMLBodyElement.generate()
        body = HTMLBodyElement.generate()
        document = HTMLDocument(document_depth, doctype,
                                head, body, document_id)
        document.add_css()
        document.add_scripts()
        return document
