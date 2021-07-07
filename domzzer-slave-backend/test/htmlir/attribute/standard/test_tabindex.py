import copy
import random
import unittest

from modules.htmlir.attribute.standard.tabindex import HTMLTabindexGlobalAttribute


class TestHTMLTabindexGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        tabindex = HTMLTabindexGlobalAttribute()
        self.assertEqual(tabindex.value, "0")

    def test_generate_works(self):
        random.seed(33)
        tabindex = HTMLTabindexGlobalAttribute.generate()
        self.assertEqual(tabindex.value, "11")

    def test_mutate_works(self):
        random.seed(6)
        tabindex = HTMLTabindexGlobalAttribute.generate()
        tabindex_copy = copy.deepcopy(tabindex)
        tabindex.mutate()
        self.assertNotEqual(tabindex.value, tabindex_copy.value)

    def test_convert_works(self):
        random.seed(666)
        tabindex = HTMLTabindexGlobalAttribute()
        self.assertEqual(tabindex.convert(
        ), "tabindex=\"9000\"")


if __name__ == '__main__':
    unittest.main()
