import random

from .htmldocument import HTMLDocument


class DOMBuilder:

    def __init__(self):
        """Constucts new DOMBuilder object instance.
        """
        self.initial_elements = 10
        self.api_call_limit = 30
        self.allow_css_api_calls = True
        self.use_try_catch = True

    def configure(self, initial_elements, api_call_limit, allow_css_api, use_try_catch):
        """Configure the DOMBuilder.

        Args:
            initial_elements (int): number of initial elements in the html-document
            api_call_limit (int): maximum number of generated dom-api (or css-api) calls
            allow_css_api (bool): are css api calls allowed
            use_try_catch (bool): should the api calls be surrounded with try catch statements
        """
        self.initial_elements = initial_elements
        self.api_call_limit = api_call_limit
        self.allow_css_api_calls = allow_css_api
        self.use_try_catch = use_try_catch

    def build(self):
        """Builds the html-document.

        Generates new html-document based on the configurations.
        
        Returns:
            str: the generated document
        """
        document = HTMLDocument()
        
        # fill the document with initial elements
        elements = 0
        while elements < self.initial_elements:
            document.generate_new_element()
            elements += 1

        # create random api calls
        api_calls = 0
        while api_calls < self.api_call_limit:
            k = random.randint(0, 1)
            if k == 0 or not self.allow_css_api_calls:
                document.generate_new_dom_api_call()
            else:
                document.generate_new_css_api_call()
            api_calls += 1

        # convert the document into string and return it
        document.use_try_catch = True
        return document.convert()