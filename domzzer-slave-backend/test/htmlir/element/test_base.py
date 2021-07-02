import random
import unittest

from modules.htmlir.attribute.href import HTMLHrefAttribute
from modules.htmlir.attribute.target import HTMLTargetAttribute
from modules.htmlir.element.base import HTMLBaseElement


class TestHTMLBaseElement(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        base = HTMLBaseElement()
        self.assertIsNone(base.target)
        self.assertIsNone(base.href)

    def test_constructor_works_with_parameters(self):
        target = HTMLTargetAttribute.generate()
        href = HTMLHrefAttribute.generate()
        base = HTMLBaseElement(target, href)
        self.assertEqual(base.target, target)
        self.assertEqual(base.href, href)

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLBaseElement, 666)

    def get_text_works(self):
        title = HTMLBaseElement()
        self.assertIsNone(title.get_text())

    def test_generate_works(self):
        base = HTMLBaseElement.generate()
        self.assertTrue(len(base.get_attributes()) >= 1)

    def test_mutate_works(self):
        base = HTMLBaseElement()
        base.mutate()
        self.assertTrue(len(base.get_attributes()) >= 1)

    def test_convert_works_without_attributes(self):
        base = HTMLBaseElement()
        expected_str = "<base>"
        self.assertEqual(base.convert(), expected_str)

    def test_convert_works_with_attributes(self):
        random.seed(666)
        target = HTMLTargetAttribute.generate()
        href = HTMLHrefAttribute.generate()
        base = HTMLBaseElement(target, href)
        expected_str = "<base target=\"_top\" href=\"\">"
        self.assertEqual(base.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
