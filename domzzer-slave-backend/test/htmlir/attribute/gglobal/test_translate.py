import random
import unittest

from modules.htmlir.attribute.gglobal.translate import HTMLTranslateGlobalAttribute


class TestHTMLTranslateAttribute(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        translate = HTMLTranslateGlobalAttribute()
        self.assertEqual(translate.value, "")

    def test_constructor_works_with_parameter(self):
        translate = HTMLTranslateGlobalAttribute("yes")
        self.assertEqual(translate.value, "yes")

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLTranslateGlobalAttribute, 999)

    def test_generate_works(self):
        random.seed(33)
        translate = HTMLTranslateGlobalAttribute.generate()
        self.assertEqual(translate.value, "no")

    def test_mutate_works(self):
        random.seed(666)
        translate = HTMLTranslateGlobalAttribute.generate()
        translate.mutate()
        self.assertEqual(translate.value, "yes")

    def test_convert_works_when_constructed_without_parameter(self):
        random.seed(666)
        translate = HTMLTranslateGlobalAttribute()
        self.assertEqual(translate.convert(
        ), "translate=\"\"")

    def test_convert_works_when_constructed_with_parameter(self):
        random.seed(666)
        translate = HTMLTranslateGlobalAttribute("yes")
        self.assertEqual(translate.convert(
        ), "translate=\"yes\"")


if __name__ == '__main__':
    unittest.main()
