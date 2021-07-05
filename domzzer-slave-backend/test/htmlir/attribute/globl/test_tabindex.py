import copy
import random
import unittest

from modules.htmlir.attribute.globl.tabindex import HTMLTabindexGlobalAttribute


class TestHTMLTabindexAttribute(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        tabindex = HTMLTabindexGlobalAttribute()
        self.assertEqual(tabindex.value, "")

    def test_constructor_works_with_parameter(self):
        tabindex = HTMLTabindexGlobalAttribute("212")
        self.assertEqual(tabindex.value, "212")

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLTabindexGlobalAttribute, 999)

    def test_generate_works(self):
        random.seed(33)
        tabindex = HTMLTabindexGlobalAttribute.generate()
        self.assertEqual(tabindex.value, "0")

    def test_mutate_works(self):
        random.seed(666)
        tabindex = HTMLTabindexGlobalAttribute.generate()
        tabindex_copy = copy.deepcopy(tabindex)
        tabindex.mutate()
        self.assertNotEqual(tabindex.value, tabindex_copy.value)

    def test_convert_works_when_constructed_without_parameter(self):
        random.seed(666)
        tabindex = HTMLTabindexGlobalAttribute()
        self.assertEqual(tabindex.convert(
        ), "tabindex=\"\"")

    def test_convert_works_when_constructed_with_parameter(self):
        random.seed(666)
        translate = HTMLTabindexGlobalAttribute("2323")
        self.assertEqual(translate.convert(
        ), "tabindex=\"2323\"")


if __name__ == '__main__':
    unittest.main()
