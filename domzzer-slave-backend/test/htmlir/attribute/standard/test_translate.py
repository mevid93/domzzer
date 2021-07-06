import random
import unittest

from modules.htmlir.attribute.standard.translate import HTMLTranslateGlobalAttribute


class TestHTMLTranslateAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        translate = HTMLTranslateGlobalAttribute()
        self.assertEqual(translate.value, "")

    def test_generate_works(self):
        random.seed(33)
        translate = HTMLTranslateGlobalAttribute.generate()
        self.assertEqual(translate.value, "")

    def test_mutate_works(self):
        random.seed(666)
        translate = HTMLTranslateGlobalAttribute.generate()
        translate.mutate()
        self.assertEqual(translate.value, "yes")

    def test_convert_works(self):
        random.seed(666)
        translate = HTMLTranslateGlobalAttribute()
        self.assertEqual(translate.convert(
        ), "translate=\"yes\"")


if __name__ == '__main__':
    unittest.main()
