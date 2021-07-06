import copy
import random
import unittest

from modules.htmlir.attribute.optional.profile import HTMLProfileAttribute


class TestHTMLProfileAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        profile = HTMLProfileAttribute()
        self.assertEqual(profile.value, "http://localhost:3002/xfn/11")

    def test_generate_works(self):
        random.seed(2)
        profile = HTMLProfileAttribute.generate()
        self.assertEqual(profile.value, "http://localhost:3002/documents/2008/08/04/dc-html/")

    def test_mutate_works(self):
        random.seed(666)
        profile = HTMLProfileAttribute()
        profile_copy = copy.deepcopy(profile)
        profile.mutate()
        self.assertTrue(profile.value, profile_copy.value)

    def test_convert_works(self):
        random.seed(666)
        profile = HTMLProfileAttribute()
        profile.mutate()
        self.assertEqual(profile.convert(
        ), "profile=\"dont know what im doing\"")


if __name__ == '__main__':
    unittest.main()
