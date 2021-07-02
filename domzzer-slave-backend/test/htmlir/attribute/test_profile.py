import random
import unittest

from modules.htmlir.attribute.profile import HTMLProfileAttribute


class TestHTMLProfileAttribute(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        profile = HTMLProfileAttribute()
        self.assertEqual(profile.value, None)

    def test_constructor_works_with_parameter(self):
        profile = HTMLProfileAttribute("http://random/value/")
        self.assertEqual(profile.value, "http://random/value/")

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLProfileAttribute, 999)

    def test_generate_works(self):
        profile = HTMLProfileAttribute.generate()
        self.assertTrue(profile.value != None)

    def test_mutate_works(self):
        random.seed(666)
        profile = HTMLProfileAttribute()
        profile.mutate()
        self.assertTrue(profile.value != None)

    def test_convert_works_when_constructed_without_parameter(self):
        random.seed(666)
        profile = HTMLProfileAttribute()
        profile.mutate()
        self.assertEqual(profile.convert(
        ), "profile=\"\"")

    def test_convert_works_when_constructed_with_parameter(self):
        random.seed(666)
        profile = HTMLProfileAttribute("http://localhost:3002/mysettings")
        self.assertEqual(profile.convert(
        ), "profile=\"http://localhost:3002/mysettings\"")


if __name__ == '__main__':
    unittest.main()
