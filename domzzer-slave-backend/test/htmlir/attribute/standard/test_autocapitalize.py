import copy
import random
import unittest

from modules.htmlir.attribute.standard.autocapitalize import HTMLAutocapitalizeGlobalAttribute


class TestHTMLAutocapitalizeGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(666)
        autocapitalize = HTMLAutocapitalizeGlobalAttribute()
        self.assertEqual(autocapitalize.value, "sentences")

    def test_generate_works(self):
        random.seed(33)
        autocapitalize = HTMLAutocapitalizeGlobalAttribute.generate()
        self.assertTrue(autocapitalize.value != None)

    def test_mutate_works(self):
        random.seed(6)
        autocapitalize = HTMLAutocapitalizeGlobalAttribute()
        autocapitalize_copy = copy.deepcopy(autocapitalize)
        autocapitalize.mutate()
        self.assertNotEqual(autocapitalize.value, autocapitalize_copy.value)

    def test_convert_works(self):
        random.seed(666)
        autocapitalize = HTMLAutocapitalizeGlobalAttribute()
        self.assertEqual(autocapitalize.convert(
        ), "autocapitalize=\"sentences\"")


if __name__ == '__main__':
    unittest.main()
