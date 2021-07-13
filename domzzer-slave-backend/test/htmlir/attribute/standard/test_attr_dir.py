import copy
import random
import unittest

from modules.htmlir.attribute.standard.attr_dir import HTMLDirGlobalAttribute


class TestHTMLDirGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(666)
        dira = HTMLDirGlobalAttribute()
        self.assertEqual(dira.value, "rtl")

    def test_generate_works(self):
        random.seed(33)
        dira = HTMLDirGlobalAttribute.generate()
        self.assertTrue(dira.value != None)

    def test_mutate_works(self):
        random.seed(6)
        dira = HTMLDirGlobalAttribute()
        dira_copy = copy.deepcopy(dira)
        dira.mutate()
        self.assertNotEqual(dira.value, dira_copy.value)

    def test_convert_works(self):
        random.seed(666)
        dira = HTMLDirGlobalAttribute()
        self.assertEqual(dira.convert(
        ), "dir=\"rtl\"")


if __name__ == '__main__':
    unittest.main()
