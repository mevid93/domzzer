import copy
import random
import unittest

from modules.htmlir.element.base import HTMLBaseElement


class TestHTMLBaseElement(unittest.TestCase):

    def test_constructor_works(self):
        base = HTMLBaseElement(0)
        self.assertTrue(base.document_depth == 0)

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLBaseElement, "wrong type")

    def test_constructor_throws_value_error(self):
        self.assertRaises(ValueError, HTMLBaseElement, None)

    def get_text_works(self):
        base = HTMLBaseElement()
        self.assertIsNone(base.get_text())

    def test_generate_works(self):
        base = HTMLBaseElement.generate(0)
        self.assertTrue(len(base.get_attributes()) >= 0)

    def test_generate_throws_type_error(self):
        self.assertRaises(TypeError, HTMLBaseElement.generate, "wrong type")

    def test_generate_throws_value_error(self):
        self.assertRaises(ValueError, HTMLBaseElement.generate, None)

    def test_mutate_works(self):
        random.seed(666)
        base = HTMLBaseElement(0)
        base_copy = copy.deepcopy(base)
        base.mutate()
        self.assertNotEqual(base_copy.convert(), base.convert())

    def test_convert_works(self):
        random.seed(666)
        base = HTMLBaseElement(0)
        expected_str = "<base href=\"\" target=\"framename\" accesskey=\"e\" tabindex=\"11\">"
        self.assertEqual(base.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
