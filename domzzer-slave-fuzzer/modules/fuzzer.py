import uuid

from .dom.dombuilder import DOMBuilder


class Fuzzer:
    """Fuzzer class for fuzzing web browsers.

    Generates html-documents and feeds them to different browsers.
    If abnormalities are detected, the document will be saved into
    configured destination (database or results/vulnerabilities folder).
    """

    def __init__(self, args, envs):
        """Constructs new Fuzzer object instance.

        Args:
            args (argparse.Namespace): command line parameters
            envs (dict): environmental variables
        """
        self.args = args
        self.envs = envs

    def run(self):
        """Perform browser fuzzing.

        Generates new html-documents and feeds them to browsers.
        If abnormalities are detected, the triggering document will be saved
        into configured destination (database or filesystem).
        """
        while(True):
            dombuilder = DOMBuilder()
            
            document_content = dombuilder.build()
            document_name = str(uuid.uuid4())

            # feed the document for each configured browser
            raise NotImplementedError()

            # check for abnormalities
            abnormalities = False

            # save to configured location if abnormalities were found
            if abnormalities:
                raise NotImplementedError()
