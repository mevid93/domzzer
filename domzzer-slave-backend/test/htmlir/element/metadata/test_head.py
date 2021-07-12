import copy
import unittest
import random

from modules.htmlir.element.metadata.head import HTMLHeadElement
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
        expected_str += "<style id=\"e_1\" accesskey=\"n\" nonce=\"0xcd447e35b8b6d8fe442e3d437204e52d\" dir=\"ltr\">\n"
        expected_str += ".myClass0 {\n"
        expected_str += "animation-iteration-count:1;\n"
        expected_str += "animation-fill-mode:inherit;\n"
        expected_str += "}\n"
        expected_str += "</style>\n"
        expected_str += "<style id=\"e_2\" enterkeyhint=\"search\" accesskey=\"h\" title=\"???????????????????+\">\n"
        expected_str += ".myClass1 {\n"
        expected_str += "column-rule-width:thick;\n"
        expected_str += "column-rule-width:inherit;\n"
        expected_str += "column-gap:inherit;\n"
        expected_str += "float:none;\n"
        expected_str += "}\n"
        expected_str += "</style>\n"
        expected_str += "</head>"
        self.assertEqual(head.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
