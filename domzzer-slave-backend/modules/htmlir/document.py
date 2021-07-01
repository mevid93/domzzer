
class HTMLDocument:
    """ Class representing HTML document.

    Attributes
    ----------
    doctype: HTMLDoctype
        HTML document type declaration
    head: HTMLHead
        HTML document head
    body: HTMLBody
        HTML document body

    Methods
    -------
    mutate()
        Mutates the HTMLDocument
    convert()
        Converts HTMLDocument object into real HTML code
    """

    def __init__(self, doctype=None, head=None, body=None):
        """ Constructor for HTMLDocument object.

        Parameters
        ----------
        doctype: HTMLDoctype, optional
            HTML document type declaration (default is None)
        head: HTMLHead, optional
            HTML document head (default is None)
        body: HTMLBody, optional
            HTML document body (default is None)
        """
        self.doctype = doctype
        self.head = head
        self.body = body

    def mutate(self):
        """ Mutates the HTMLDocument """
        raise NotImplementedError

    def convert(self):
        """ Returns HTMLDocument as string.

        This method converts HTMLDocument object into real HTML code.

        Returns
        -------
        str
            a string of real HTML code
        """
        document_str = self.doctype.to_string() if self.doctype != None else ""
        document_str += "<html>\n"
        document_str += self.head.to_string() if self.head != None else ""
        document_str += self.body.to_string() if self.body != None else ""
        document_str += "</html>"
