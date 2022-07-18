
class HTMLDocument:
    """Class representing html-document.

    Provides functionality to generate new document with
    random elements, dom-api calls, and css-api calls.
    """

    def __init__(self):
        """Constucts new HTMLDocument object instance.
        """
        self.dom_commands = []  # js string (all dom api calls)
        self.element_ids = []   # id list of all elements in the document

    def generate_new_element(self):
        raise NotImplementedError()

    def convert(self):
        """Convert the document into string representation.

        Returns:
            str: document in string representation 
        """
        docstr = "<!DOCTYPE html>\n"
        docstr += "<html>\n"
        docstr += "<head>\n"
        docstr += "<meta charset=\"UTF-8\">\n"
        docstr += "<title>DOMZZER</title>\n"
        docstr += "</head>\n"
        docstr += "<body>\n"
        docstr += "<script>\n"
        docstr += "\n".join(self.dom_commands)
        docstr += "</script>\n"
        docstr += "</body>\n"
        docstr += "</html>"
        return docstr        
