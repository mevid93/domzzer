import random
import unittest

from modules.htmlir.attribute.globl.accesskey import HTMLAccesskeyGlobalAttribute


class TestHTMLHrefAttribute(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        accesskey = HTMLAccesskeyGlobalAttribute()
        self.assertEqual(accesskey.value, None)

    def test_constructor_works_with_parameter(self):
        accesskey = HTMLAccesskeyGlobalAttribute("a")
        self.assertEqual(accesskey.value, "a")

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLAccesskeyGlobalAttribute, 999)

    def test_generate_works(self):
        random.seed(33)
        accesskey = HTMLAccesskeyGlobalAttribute.generate()
        self.assertTrue(accesskey.value != None)

    def test_mutate_works(self):
        random.seed(666)
        accesskey = HTMLAccesskeyGlobalAttribute("a")
        accesskey.mutate()
        self.assertTrue(accesskey.value != "a")

    def test_convert_works_when_constructed_without_parameter(self):
        random.seed(666)
        accesskey = HTMLAccesskeyGlobalAttribute()
        self.assertEqual(accesskey.convert(
        ), "accesskey=\"\"")

    def test_convert_works_when_constructed_with_parameter(self):
        random.seed(666)
        accesskey = HTMLAccesskeyGlobalAttribute("a")
        self.assertEqual(accesskey.convert(
        ), "accesskey=\"a\"")


if __name__ == '__main__':
    unittest.main()
