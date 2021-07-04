import random
import unittest

from modules.htmlir.attribute.gglobal.spellcheck import HTMLSpellcheckGlobalAttribute


class TestHTMLSpellcheckAttribute(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        spellcheck = HTMLSpellcheckGlobalAttribute()
        self.assertEqual(spellcheck.value, False)

    def test_constructor_works_with_parameter(self):
        spellcheck = HTMLSpellcheckGlobalAttribute(True)
        self.assertEqual(spellcheck.value, True)

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLSpellcheckGlobalAttribute, 999)

    def test_generate_works(self):
        random.seed(33)
        spellcheck = HTMLSpellcheckGlobalAttribute.generate()
        self.assertTrue(spellcheck.value == False)

    def test_mutate_works(self):
        random.seed(666)
        spellcheck = HTMLSpellcheckGlobalAttribute()
        spellcheck.mutate()
        self.assertTrue(spellcheck.value)

    def test_convert_works_when_constructed_without_parameter(self):
        random.seed(666)
        accesskey = HTMLSpellcheckGlobalAttribute()
        self.assertEqual(accesskey.convert(
        ), "spellcheck=\"false\"")

    def test_convert_works_when_constructed_with_parameter(self):
        random.seed(666)
        accesskey = HTMLSpellcheckGlobalAttribute(True)
        self.assertEqual(accesskey.convert(
        ), "spellcheck=\"true\"")


if __name__ == '__main__':
    unittest.main()
