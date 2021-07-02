import unittest

from modules.htmlir.element.head import HTMLElementHead


class TestHTMLElementHead(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        head = HTMLElementHead()
        self.assertIsNone(head.element_title)
        self.assertIsNone(head.attribute_profile)

    def test_constructor_works_with_parameters(self):
        pass

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLElementHead, "wrong type")

    def test_generator_works(self):
        pass

    def test_mutator_works(self):
        pass

    def test_convert_works_without_attributes_or_child_elements(self):
        head = HTMLElementHead()
        expected_str = "<head>\n</head>"
        self.assertEqual(head.convert(), expected_str)

    def test_convert_works_with_attributes_and_child_elements(self):
        pass


if __name__ == '__main__':
    unittest.main()
