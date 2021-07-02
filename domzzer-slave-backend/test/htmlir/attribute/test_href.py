import random
import unittest

from modules.htmlir.attribute.href import HTMLHrefAttribute


class TestHTMLHrefAttribute(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        href = HTMLHrefAttribute()
        self.assertEqual(href.value, None)

    def test_constructor_works_with_parameter(self):
        href = HTMLHrefAttribute("http://localhost:9999/random")
        self.assertEqual(href.value, "http://localhost:9999/random")

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLHrefAttribute, 999)

    def test_generate_works(self):
        profile = HTMLHrefAttribute.generate()
        self.assertTrue(profile.value != None)

    def test_mutate_works(self):
        random.seed(666)
        profile = HTMLHrefAttribute()
        profile.mutate()
        self.assertTrue(profile.value != None)

    def test_convert_works_when_constructed_without_parameter(self):
        random.seed(666)
        profile = HTMLHrefAttribute()
        profile.mutate()
        self.assertEqual(profile.convert(
        ), "href=\"\"")

    def test_convert_works_when_constructed_with_parameter(self):
        random.seed(666)
        profile = HTMLHrefAttribute("http://localhost:3002/mysettings")
        self.assertEqual(profile.convert(
        ), "href=\"http://localhost:3002/mysettings\"")


if __name__ == '__main__':
    unittest.main()
