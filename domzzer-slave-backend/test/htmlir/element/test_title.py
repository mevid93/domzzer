import copy
import random
import unittest

from modules.htmlir.element.title import HTMLTitleElement


class TestHTMLTitleElement(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        title = HTMLTitleElement(0)
        self.assertIsNotNone(title.text)

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLTitleElement, "wrong type")

    def test_constructor_throws_value_error(self):
        self.assertRaises(ValueError, HTMLTitleElement, None)

    def get_text_works(self):
        random.seed(666)
        title = HTMLTitleElement(0)
        excpected_str = "domzzer"
        self.assertEqual(title.get_text(), excpected_str)

    def test_generate_works(self):
        title = HTMLTitleElement.generate(0)
        self.assertTrue(isinstance(title, HTMLTitleElement))

    def test_generate_throws_type_error(self):
        self.assertRaises(TypeError, HTMLTitleElement.generate, "wrong type")

    def test_generate_throws_value_error(self):
        self.assertRaises(ValueError, HTMLTitleElement.generate, None)

    def test_mutate_works(self):
        random.seed(66)
        title = HTMLTitleElement(0)
        title_copy = copy.deepcopy(title)
        title.mutate()
        self.assertNotEqual(title.convert(), title_copy.convert())

    def test_convert_works(self):
        random.seed(666)
        title = HTMLTitleElement(0)
        expected_str = "<title enterkeyhint=\"previous\" accesskey=\"r\" spellcheck=\"false\">"
        expected_str += "https://github.com/mevid93/domzzer"
        expected_str += "</title>"
        self.assertEqual(title.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
