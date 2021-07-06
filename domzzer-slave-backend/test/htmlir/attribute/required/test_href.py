import random
import unittest

from modules.htmlir.attribute.required.href import HTMLHrefAttribute


class TestHTMLHrefAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        href = HTMLHrefAttribute()
        self.assertEqual(href.value, "https://localhost:3002/unknown")

    def test_generate_works(self):
        profile = HTMLHrefAttribute.generate()
        self.assertTrue(profile.value != None)

    def test_mutate_works(self):
        random.seed(666)
        profile = HTMLHrefAttribute()
        profile.mutate()
        self.assertTrue(profile.value != None)

    def test_convert_works(self):
        random.seed(666)
        profile = HTMLHrefAttribute()
        profile.mutate()
        self.assertEqual(profile.convert(
        ), "href=\"\"")


if __name__ == '__main__':
    unittest.main()
