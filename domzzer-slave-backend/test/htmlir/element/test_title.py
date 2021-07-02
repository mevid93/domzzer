import unittest

from modules.htmlir.element.title import HTMLTitleElement


class TestHTMLTitleElement(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        title = HTMLTitleElement()
        self.assertIsNone(title.text)

    def test_constructor_works_with_parameters(self):
        title = HTMLTitleElement("Testing domzzer")
        self.assertEqual(title.text, "Testing domzzer")

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLTitleElement, 666)

    def get_text_works(self):
        title = HTMLTitleElement("domzzer")
        excpected_str = "domzzer"
        self.assertEqual(title.get_text(), excpected_str)

    def test_generate_works(self):
        title = HTMLTitleElement.generate()
        self.assertTrue(isinstance(title, HTMLTitleElement))

    def test_mutate_works(self):
        title = HTMLTitleElement()
        title.mutate()
        self.assertTrue(title.text != None)

    def test_convert_works_without_attributes(self):
        title = HTMLTitleElement()
        expected_str = "<title></title>"
        self.assertEqual(title.convert(), expected_str)

    def test_convert_works_with_attributes(self):
        title = HTMLTitleElement("domzzer")
        expected_str = "<title>domzzer</title>"
        self.assertEqual(title.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
