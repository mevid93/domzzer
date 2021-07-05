import copy
import random
import unittest

from modules.htmlir.element.body import HTMLBodyElement


class TestHTMLBodyElement(unittest.TestCase):

    def test_constructor_works(self):
        body = HTMLBodyElement(0)
        self.assertTrue(isinstance(body, HTMLBodyElement))

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLBodyElement, "wrong type")

    def test_constructor_throws_value_error(self):
        self.assertRaises(ValueError, HTMLBodyElement, None)

    def test_get_text_works(self):
        body = HTMLBodyElement(0)
        self.assertIsNotNone(body.get_text())

    def test_generate_works(self):
        body = HTMLBodyElement.generate(0)
        self.assertTrue(isinstance(body, HTMLBodyElement))

    def test_generate_throws_type_error(self):
        self.assertRaises(TypeError, HTMLBodyElement.generate, "wrong type")

    def test_generate_throws_value_error(self):
        self.assertRaises(ValueError, HTMLBodyElement.generate, None)

    def test_mutate_works(self):
        random.seed(666)
        body = HTMLBodyElement(0)
        body_copy = copy.deepcopy(body)
        body.mutate()
        self.assertNotEqual(body.convert(), body_copy.convert())

    def test_convert_works(self):
        random.seed(27)
        body = HTMLBodyElement(2)
        expected_str = "<body tabindex=\"23\" spellcheck=\"false\" accesskey=\"i\" translate=\"yes\" title=\"Title\">\nmevid93\n</body>"
        self.assertEqual(body.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
