import copy
import random
import unittest

from modules.htmlir.attribute.standard.itemprop import HTMLItempropGlobalAttribute


class TestHTMLItempropGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        itemprop = HTMLItempropGlobalAttribute()
        self.assertEqual(itemprop.value, "age")

    def test_generate_works(self):
        random.seed(33)
        itemprop = HTMLItempropGlobalAttribute.generate()
        self.assertEqual(itemprop.value, "age")

    def test_mutate_works(self):
        random.seed(6)
        itemprop = HTMLItempropGlobalAttribute()
        itemprop_copy = copy.deepcopy(itemprop)
        itemprop.mutate()
        self.assertNotEqual(itemprop.value, itemprop_copy.value)

    def test_convert_works(self):
        random.seed(666)
        itemprop = HTMLItempropGlobalAttribute()
        self.assertEqual(itemprop.convert(
        ), "itemprop=\"origin\"")


if __name__ == '__main__':
    unittest.main()
