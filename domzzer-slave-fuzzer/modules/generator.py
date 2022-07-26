import uuid

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
        """Generates 1000 new html-documents.

        Generated documents are stored into results/documents folder.
        """
        counter = 0
        while(counter < 100):
            dombuilder = DOMBuilder()
            
            document_content = dombuilder.build()
            document_name = str(uuid.uuid4())
            
            self.result_writer.save_document(document_name, document_content)
            
            counter += 1
            if counter % 10 == 0:
                print("Documents generated: " + str(counter) + "/100")
