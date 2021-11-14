from .dom.dombuilder import DOMBuilder
from .resultwriter import ResultWriter


class Generator:
    """ Generator class for generating html-documents.

    Generator html-documents and stores them into results/documents folder.
    """

    def __init__(self):
        """Constructs new Generator object instance. 
        """
        self.result_writer = ResultWriter()

    def run(self):
        """Generates new html-documents.

        Generated documents are stored into results/documents folder.
        """
        while(True):
            dombuilder = DOMBuilder()
            dombuilder.configure(initial_elements=20,
                                 api_call_limit=100,
                                 allow_css_api=True,
                                 use_try_catch=True)
            document = dombuilder.build()
            self.result_writer.save_document(document)
