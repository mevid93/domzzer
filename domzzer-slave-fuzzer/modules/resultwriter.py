
class ResultWriter:

    def __init__(self):
        raise NotImplementedError()

    def save_document(self, document):
        raise NotImplementedError()

    def save_vulnerability(self):
        raise NotImplementedError()
