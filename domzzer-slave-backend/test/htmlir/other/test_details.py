import unittest
import random

from modules.htmlir.other.details import HTMLDocumentDetails


class TestHTMLDocumentDetails(unittest.TestCase):

    def test_constructor_works(self):
        details = HTMLDocumentDetails()
        self.assertTrue(isinstance(details, HTMLDocumentDetails))

    def test_get_next_id_works(self):
        details = HTMLDocumentDetails()
        self.assertEqual(details.id, 0)
        element_id = details.get_next_id()
        self.assertEqual(details.id, 1)
        self.assertEqual(element_id, "e_0")

    def test_get_css_classes_works(self):
        random.seed(81)
        details = HTMLDocumentDetails()
        self.assertEqual(len(details.css_classes), 8)
        classes = details.get_css_classes()
        self.assertEqual(classes[0], "myClass6")


if __name__ == '__main__':
    unittest.main()
