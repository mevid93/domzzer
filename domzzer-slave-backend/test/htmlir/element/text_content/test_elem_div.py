import copy
import unittest
import random

from modules.htmlir.element.text_content.elem__div import HTMLDivElement
from modules.htmlir.other.details import HTMLDocumentDetails


class TestHTMLDivElement(unittest.TestCase):

    def test_constructor_works(self):
        details = HTMLDocumentDetails()
        div = HTMLDivElement(0, details)
        self.assertTrue(isinstance(div, HTMLDivElement))

    def test_mutate_works(self):
        random.seed(1)
        details = HTMLDocumentDetails()
        dev = HTMLDivElement(0, details)
        dev_copy = copy.deepcopy(dev)
        dev.mutate()
        self.assertNotEqual(dev.convert(), dev_copy.convert())

    def test_generate_works(self):
        random.seed(1)
        doc_details = HTMLDocumentDetails()
        div = HTMLDivElement.generate(0, doc_details)
        self.assertTrue(isinstance(div, HTMLDivElement))

    def test_convert_works(self):
        random.seed(12)
        self.maxDiff = None
        doc_details = HTMLDocumentDetails()
        div = HTMLDivElement(0, doc_details)
        expected_str = "<div id=\"e_0\" spellcheck=\"true\" accesskey=\"p\" draggable=\"false\" nonce=\"0x298a59f85e1ea97870a76e49fa60dbd6\">\n"
        expected_str += "</div>"
        self.assertEqual(div.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
