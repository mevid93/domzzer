import copy
import unittest
import random

from modules.htmlir.element.metadata.head import HTMLHeadElement
from modules.htmlir.other.details import HTMLDocumentDetails


class TestHTMLHead(unittest.TestCase):

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
        doc_details = HTMLDocumentDetails()
        head = HTMLHeadElement.generate(0, doc_details)
        expected_str = "<head id=\"e_0\" autocapitalize=\"sentences\" inputmode=\"numeric\">\n"
        expected_str += "</head>"
        self.assertEqual(head.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
