import random
import unittest

from modules.htmlir.attribute.globl.autocapitalize import HTMLAutocapitalizeGlobalAttribute


class TestHTMLAutocapitalizeAttribute(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        autocapitalize = HTMLAutocapitalizeGlobalAttribute()
        self.assertEqual(autocapitalize.value, "off")

    def test_constructor_works_with_parameter(self):
        autocapitalize = HTMLAutocapitalizeGlobalAttribute("words")
        self.assertEqual(autocapitalize.value, "words")

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLAutocapitalizeGlobalAttribute, 999)

    def test_generate_works(self):
        random.seed(33)
        autocapitalize = HTMLAutocapitalizeGlobalAttribute.generate()
        self.assertTrue(autocapitalize.value != None)

    def test_mutate_works(self):
        random.seed(666)
        autocapitalize = HTMLAutocapitalizeGlobalAttribute("off")
        autocapitalize.mutate()
        self.assertTrue(autocapitalize.value != "off")

    def test_convert_works_when_constructed_without_parameter(self):
        random.seed(666)
        autocapitalize = HTMLAutocapitalizeGlobalAttribute()
        self.assertEqual(autocapitalize.convert(
        ), "autocapitalize=\"off\"")

    def test_convert_works_when_constructed_with_parameter(self):
        random.seed(666)
        autocapitalize = HTMLAutocapitalizeGlobalAttribute("none")
        self.assertEqual(autocapitalize.convert(
        ), "autocapitalize=\"none\"")


if __name__ == '__main__':
    unittest.main()
