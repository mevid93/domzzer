import copy
import random
import unittest

from modules.htmlir.attribute.standard.attr_style import HTMLStyleGlobalAttribute


class TestHTMLStyleGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        style = HTMLStyleGlobalAttribute()
        self.assertTrue(isinstance(style, HTMLStyleGlobalAttribute))

    def test_generate_works(self):
        random.seed(2)
        style = HTMLStyleGlobalAttribute.generate()
        self.assertTrue(isinstance(style, HTMLStyleGlobalAttribute))

    def test_mutate_works(self):
        random.seed(3)
        style = HTMLStyleGlobalAttribute()
        style_copy = copy.deepcopy(style)
        style.mutate()
        self.assertNotEqual(style.convert(), style_copy.convert())

    def test_convert_works(self):
        random.seed(4)
        style = HTMLStyleGlobalAttribute()
        self.assertEqual(style.convert(
        ), "style=\"font-size-adjust:1;\"")


if __name__ == '__main__':
    unittest.main()
