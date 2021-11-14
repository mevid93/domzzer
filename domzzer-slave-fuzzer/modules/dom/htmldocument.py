
class HTMLDocument:
    """Class representing html-document.

    Provides functionality to generate new document with
    random elements, dom-api calls, and css-api calls.
    """

    def __init__(self):
        self.use_try_catch = True

    def generate_new_element(self):
        raise NotImplementedError()

    def generate_new_dom_api_call(self):
        raise NotImplementedError()

    def generate_new_css_api_call(self):
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
        # TODO: convert elements and api calls
        docstr += "</script>\n"
        docstr += "</body>\n"
        docstr += "</html>"
        return docstr        
