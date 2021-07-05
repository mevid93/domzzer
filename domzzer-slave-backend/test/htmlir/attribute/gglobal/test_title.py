import copy
import random
import unittest

from modules.htmlir.attribute.gglobal.title import HTMLTitleGlobalAttribute


class TestHTMLTitleAttribute(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        title = HTMLTitleGlobalAttribute()
        self.assertEqual(title.value, "")

    def test_constructor_works_with_parameter(self):
        translate = HTMLTitleGlobalAttribute("yes")
        self.assertEqual(translate.value, "yes")

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLTitleGlobalAttribute, 999)

    def test_generate_works(self):
        random.seed(33)
        title = HTMLTitleGlobalAttribute.generate()
        self.assertEqual(title.value, "Another title for attribute")

    def test_mutate_works(self):
        random.seed(666)
        title = HTMLTitleGlobalAttribute.generate()
        title_copy = copy.deepcopy(title)
        title.mutate()
        self.assertNotEqual(title.value, title_copy.value)

    def test_convert_works_when_constructed_without_parameter(self):
        random.seed(666)
        title = HTMLTitleGlobalAttribute()
        self.assertEqual(title.convert(
        ), "title=\"\"")

    def test_convert_works_when_constructed_with_parameter(self):
        random.seed(666)
        translate = HTMLTitleGlobalAttribute("yes")
        self.assertEqual(translate.convert(
        ), "title=\"yes\"")


if __name__ == '__main__':
    unittest.main()
