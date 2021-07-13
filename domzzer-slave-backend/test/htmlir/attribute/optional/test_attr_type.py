import copy
import random
import unittest

from modules.htmlir.attribute.optional.attr_type import HTMLTypeAttribute


class TestHTMLTypeAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        t = HTMLTypeAttribute()
        self.assertTrue(isinstance(t, HTMLTypeAttribute))

    def test_generate_works(self):
        random.seed(2)
        t = HTMLTypeAttribute.generate()
        self.assertTrue(isinstance(t, HTMLTypeAttribute))

    def test_mutate_works(self):
        random.seed(666)
        t = HTMLTypeAttribute()
        t_copy = copy.deepcopy(t)
        t.mutate()
        self.assertNotEqual(t.convert(), t_copy.convert())

    def test_convert_works(self):
        random.seed(666)
        t = HTMLTypeAttribute()
        self.assertEqual(t.convert(
        ), "type=\"audio/ogg\"")


if __name__ == '__main__':
    unittest.main()
