import copy
import unittest
import random

from modules.htmlir.element.sectioning.body import HTMLBodyElement
from modules.htmlir.other.details import HTMLDocumentDetails


class TestHTMLHead(unittest.TestCase):

    def test_constructor_works(self):
        details = HTMLDocumentDetails()
        body = HTMLBodyElement(0, details)
        self.assertTrue(isinstance(body, HTMLBodyElement))

    def test_mutate_works(self):
        random.seed(1)
        details = HTMLDocumentDetails()
        body = HTMLBodyElement(0, details)
        body_copy = copy.deepcopy(body)
        body.mutate()
        self.assertNotEqual(body.convert(), body_copy.convert())

    def test_generate_works(self):
        random.seed(1)
        doc_details = HTMLDocumentDetails()
        body = HTMLBodyElement.generate(0, doc_details)
        self.assertTrue(isinstance(body, HTMLBodyElement))

    def test_convert_works(self):
        random.seed(1)
        doc_details = HTMLDocumentDetails()
        body = HTMLBodyElement.generate(0, doc_details)
        expected_str = "<body id=\"e_0\" contenteditable=\"true\" inputmode=\"numeric\">\n"
        expected_str += "</body>"
        self.assertEqual(body.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
