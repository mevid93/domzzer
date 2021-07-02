import random
import unittest

from modules.htmlir.attribute.target import HTMLTargetAttribute


class TestHTMLTargetAttribute(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        target = HTMLTargetAttribute()
        self.assertEqual(target.value, None)

    def test_constructor_works_with_parameter(self):
        target = HTMLTargetAttribute("some_frame_name")
        self.assertEqual(target.value, "some_frame_name")

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLTargetAttribute, 999)

    def test_generate_works(self):
        target = HTMLTargetAttribute.generate()
        self.assertTrue(target.value != None)

    def test_mutate_works(self):
        random.seed(666)
        target = HTMLTargetAttribute()
        target.mutate()
        self.assertTrue(target.value != None)

    def test_convert_works_when_constructed_without_parameter(self):
        random.seed(666)
        target = HTMLTargetAttribute()
        self.assertEqual(target.convert(
        ), "target=\"\"")

    def test_convert_works_when_constructed_with_parameter(self):
        random.seed(666)
        target = HTMLTargetAttribute("_blank")
        self.assertEqual(target.convert(
        ), "target=\"_blank\"")


if __name__ == '__main__':
    unittest.main()
