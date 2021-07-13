import copy
import random
import unittest

from modules.htmlir.attribute.standard.attr_lang import HTMLLangGlobalAttribute


class TestHTMLLangGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        lang = HTMLLangGlobalAttribute()
        self.assertTrue(isinstance(lang, HTMLLangGlobalAttribute))

    def test_generate_works(self):
        random.seed(2)
        lang = HTMLLangGlobalAttribute.generate()
        self.assertTrue(isinstance(lang, HTMLLangGlobalAttribute))

    def test_mutate_works(self):
        random.seed(3)
        lang = HTMLLangGlobalAttribute()
        lang_copy = copy.deepcopy(lang)
        lang.mutate()
        self.assertNotEqual(lang.convert(), lang_copy.convert())

    def test_convert_works(self):
        random.seed(4)
        lang = HTMLLangGlobalAttribute()
        self.assertEqual(lang.convert(
        ), "lang=\"gu\"")


if __name__ == '__main__':
    unittest.main()
