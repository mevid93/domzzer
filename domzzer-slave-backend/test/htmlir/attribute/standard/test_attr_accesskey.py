import copy
import random
import unittest

from modules.htmlir.attribute.standard.attr_accesskey import HTMLAccesskeyGlobalAttribute


class TestHTMLAcceskeyGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        accesskey = HTMLAccesskeyGlobalAttribute()
        self.assertEqual(accesskey.value, "e")

    def test_generate_works(self):
        random.seed(33)
        accesskey = HTMLAccesskeyGlobalAttribute.generate()
        self.assertTrue(accesskey.value != None)

    def test_mutate_works(self):
        random.seed(666)
        accesskey = HTMLAccesskeyGlobalAttribute()
        accesskey_copy = copy.deepcopy(accesskey)
        accesskey.mutate()
        self.assertNotEqual(accesskey.value, accesskey_copy.value)

    def test_convert_works(self):
        random.seed(666)
        accesskey = HTMLAccesskeyGlobalAttribute()
        self.assertEqual(accesskey.convert(
        ), "accesskey=\"o\"")


if __name__ == '__main__':
    unittest.main()
