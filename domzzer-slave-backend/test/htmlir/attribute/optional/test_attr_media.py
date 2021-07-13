import copy
import random
import unittest

from modules.htmlir.attribute.optional.attr_media import HTMLMediaAttribute


class TestHTMLMediaAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        media = HTMLMediaAttribute()
        self.assertTrue(isinstance(media, HTMLMediaAttribute))

    def test_generate_works(self):
        random.seed(2)
        media = HTMLMediaAttribute.generate()
        self.assertTrue(isinstance(media, HTMLMediaAttribute))

    def test_mutate_works(self):
        random.seed(666)
        media = HTMLMediaAttribute()
        media_copy = copy.deepcopy(media)
        media.mutate()
        self.assertNotEqual(media.convert(), media_copy.convert())

    def test_convert_works(self):
        random.seed(666)
        media = HTMLMediaAttribute()
        media.mutate()
        self.assertEqual(media.convert(
        ), "media=\"tv and (width:500px)\"")


if __name__ == '__main__':
    unittest.main()
