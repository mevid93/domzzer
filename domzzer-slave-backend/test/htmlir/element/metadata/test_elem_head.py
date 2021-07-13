import copy
import unittest
import random

from modules.htmlir.element.metadata.elem_head import HTMLHeadElement
from modules.htmlir.other.details import HTMLDocumentDetails


class TestHTMLHeadElement(unittest.TestCase):

    def test_constructor_works(self):
        details = HTMLDocumentDetails()
        head = HTMLHeadElement(0, details)
        self.assertTrue(isinstance(head, HTMLHeadElement))

    def test_mutate_works(self):
        random.seed(1)
        details = HTMLDocumentDetails()
        head = HTMLHeadElement(0, details)
        head_copy = copy.deepcopy(head)
        head.mutate()
        self.assertNotEqual(head.convert(), head_copy.convert())

    def test_generate_works(self):
        random.seed(1)
        doc_details = HTMLDocumentDetails()
        head = HTMLHeadElement.generate(0, doc_details)
        self.assertTrue(isinstance(head, HTMLHeadElement))

    def test_convert_works(self):
        random.seed(1)
        self.maxDiff = None
        doc_details = HTMLDocumentDetails()
        head = HTMLHeadElement.generate(0, doc_details)
        expected_str = "<head id=\"e_0\" contenteditable=\"true\" inputmode=\"numeric\">\n"
        expected_str += "<style id=\"e_1\" media=\"tty , (min-device-aspect-ratio:16/9)\" contenteditable>\n"
        expected_str += ".myClass0 {\n"
        expected_str += "}\n"
        expected_str += "</style>\n"
        expected_str += "<style id=\"e_2\" media=\"all , (grid:1)\" type=\"audio/mp4\" hidden spellcheck=\"true\" dir=\"rtl\">\n"
        expected_str += ".myClass1 {\n"
        expected_str += "border-collapse:collapse;\n"
        expected_str += "font-family:Times;\n"
        expected_str += "grid-auto-rows:10px;\n"
        expected_str += "text-decoration-line:inherit;\n"
        expected_str += "}\n"
        expected_str += "</style>\n"
        expected_str += "</head>"
        self.assertEqual(head.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
