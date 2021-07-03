import copy
import random
import unittest

from modules.htmlir.element.head import HTMLHeadElement


class TestHTMLHeadElement(unittest.TestCase):

    def test_constructor_works(self):
        pass

    def test_constructor_works_with_parameters(self):
        pass

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLHeadElement, "wrong type")

    def test_constructor_throws_value_error(self):
        self.assertRaises(ValueError, HTMLHeadElement, None)

    def test_get_text_works(self):
        pass

    def test_generate_works(self):
        pass

    def test_generate_throws_type_error(self):
        self.assertRaises(TypeError, HTMLHeadElement.generate, "wrong type")

    def test_generate_throws_value_error(self):
        self.assertRaises(ValueError, HTMLHeadElement.generate, None)

    def test_mutate_works(self):
        pass

    def test_convert_works(self):
        pass


if __name__ == '__main__':
    unittest.main()
