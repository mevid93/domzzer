import random
import unittest

from modules.htmlir.attribute.profile import HTMLProfileAttribute
from modules.htmlir.element.head import HTMLHeadElement


class TestHTMLHeadElement(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        head = HTMLHeadElement()
        self.assertIsNone(head.element_title)
        self.assertIsNone(head.attribute_profile)

    def test_constructor_works_with_parameters(self):
        pass

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLHeadElement, "wrong type")

    def test_get_text_works(self):
        head = HTMLHeadElement()
        self.assertIsNone(head.get_text())
    
    def test_generate_works(self):
        pass

    def test_mutate_works(self):
        pass

    def test_convert_works_without_attributes_or_child_elements(self):
        head = HTMLHeadElement()
        expected_str = "<head>\n</head>"
        self.assertEqual(head.convert(), expected_str)

    def test_convert_works_with_attributes(self):
        random.seed(313)
        profile = HTMLProfileAttribute.generate()
        head = HTMLHeadElement(profile=profile)
        expected_str = "<head profile=\"http://localhost:3002/xfn/11\">\n</head>"
        self.assertEqual(head.convert(), expected_str)

    def test_convert_works_with_child_elements(self):
        pass

    def test_convert_works_with_attributes_and_child_elements(self):
        pass


if __name__ == '__main__':
    unittest.main()
