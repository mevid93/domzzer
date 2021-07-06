import random
import unittest

from modules.htmlir.attribute.optional.target import HTMLTargetAttribute


class TestHTMLTargetAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        target = HTMLTargetAttribute()
        self.assertEqual(target.value, "_self")

    def test_generate_works(self):
        random.seed(2)
        target = HTMLTargetAttribute.generate()
        self.assertEqual(target.value, "_blank")

    def test_mutate_works(self):
        random.seed(666)
        target = HTMLTargetAttribute()
        target.mutate()
        self.assertEqual(target.value, "_top")

    def test_convert_works(self):
        random.seed(666)
        target = HTMLTargetAttribute()
        self.assertEqual(target.convert(
        ), "target=\"_top\"")


if __name__ == '__main__':
    unittest.main()
