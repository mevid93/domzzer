from modules.htmlir.document import HTMLDocument


class Generator:
    """ Generator class for generating HTML pages.

    This class provides functionality to generate HTML files that can
    be used for browser fuzzing.

    Static methods
    --------------
    generate_new_document(document_id)
        Method for generating new HTMLDocument object with given document id
    mutate_existing_document(document)
        Method for randomly mutating existing HTMLDocumentObject
    convert_exiting_document(document)
        Method converts existing document into HTML code
    """

    @staticmethod
    def generate_new_document(document_id, document_depth):
        """ Generate new document

        Method generated new HTMLDocument object with given id and returns it.

        Parameters
        ----------
        document_id: str
            Document id for identification
        document_depth: int
            Document depth, i.e. length of longest path to any leaf node from root node
        Retuns
        ------
        HTMLDocument
            Generated HTMLDocument object
        """
        if document_id == None:
            raise ValueError
        if not isinstance(document_id, str):
            raise TypeError
        if document_depth == None:
            raise ValueError
        if not isinstance(document_depth, int):
            raise TypeError
        document = HTMLDocument.generate(
            document_depth=document_depth, document_id=document_id)
        return document

    @staticmethod
    def mutate_existing_document(document):
        """ Mutate existin document.

        Mutates the HTMLDocument that is provided as parameter and returns it.

        Returns
        -------
        HTMLDocument
            Mutated HTMLDocument object
        """
        if document == None:
            raise ValueError
        if not isinstance(document, HTMLDocument):
            raise TypeError
        document.mutate()
        return document

    @staticmethod
    def convert_existing_document(document):
        if document == None:
            raise ValueError
        if not isinstance(document, HTMLDocument):
            raise TypeError
        document_str = document.convert()
        return document_str
