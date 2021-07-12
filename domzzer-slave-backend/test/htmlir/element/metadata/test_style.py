import copy
import unittest
import random

from modules.htmlir.element.metadata.style import HTMLStyleElement
from modules.htmlir.other.details import HTMLDocumentDetails


class TestHTMLStyleElement(unittest.TestCase):

    def test_constructor_works(self):
        details = HTMLDocumentDetails()
        style = HTMLStyleElement("CSS", 0, details)
        self.assertTrue(isinstance(style, HTMLStyleElement))

    def test_mutate_works(self):
        random.seed(1)
        details = HTMLDocumentDetails()
        style = HTMLStyleElement("CSS", 0, details)
        style_copy = copy.deepcopy(style)
        style.mutate()
        self.assertNotEqual(style.convert(), style_copy.convert())

    def test_generate_with_name_works(self):
        random.seed(1)
        doc_details = HTMLDocumentDetails()
        style = HTMLStyleElement.generate_with_name("CSS", 0, doc_details)
        self.assertTrue(isinstance(style, HTMLStyleElement))

    def test_convert_works(self):
        random.seed(12)
        self.maxDiff = None
        doc_details = HTMLDocumentDetails()
        style = HTMLStyleElement("CSS", 0, doc_details)
        expected_str = "<style id=\"e_0\" spellcheck=\"true\" accesskey=\"p\" draggable=\"false\" nonce=\"0x298a59f85e1ea97870a76e49fa60dbd6\">\n"
        expected_str += ".CSS {\n"
        expected_str += "color:red;\n"
        expected_str += "word-break:break-all;\n"
        expected_str += "}\n"
        expected_str += "</style>"
        self.assertEqual(style.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
