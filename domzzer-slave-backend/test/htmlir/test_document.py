import copy
import unittest
import random

from modules.htmlir.document import HTMLDocument


class TestHTMLDocument(unittest.TestCase):

    def test_constructor_works(self):
        document = HTMLDocument(0, "test111")
        self.assertTrue(isinstance(document, HTMLDocument))

    def test_mutate_works(self):
        pass

    def test_generate_works(self):
        pass


if __name__ == '__main__':
    unittest.main()
