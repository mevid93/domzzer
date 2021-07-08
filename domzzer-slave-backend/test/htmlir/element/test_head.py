import copy
import random
import unittest

from modules.htmlir.element.head import HTMLHeadElement


class TestHTMLHeadElement(unittest.TestCase):

    def test_constructor_works(self):
        head = HTMLHeadElement(0)
        self.assertTrue(isinstance(head, HTMLHeadElement))

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLHeadElement, "wrong type")

    def test_constructor_throws_value_error(self):
        self.assertRaises(ValueError, HTMLHeadElement, None)

    def test_get_text_works(self):
        head = HTMLHeadElement(0)
        self.assertIsNone(head.get_text())

    def test_generate_works(self):
        head = HTMLHeadElement.generate(0)
        self.assertTrue(isinstance(head, HTMLHeadElement))

    def test_generate_throws_type_error(self):
        self.assertRaises(TypeError, HTMLHeadElement.generate, "wrong type")

    def test_generate_throws_value_error(self):
        self.assertRaises(ValueError, HTMLHeadElement.generate, None)

    def test_mutate_works(self):
        random.seed(666)
        head = HTMLHeadElement(0)
        head_copy = copy.deepcopy(head)
        head.mutate()
        self.assertNotEqual(head.convert(), head_copy.convert())

    def test_convert_works(self):
        random.seed(666)
        head = HTMLHeadElement(2)
        expected_str = "<head profile=\"???????????????????????????\" accesskey=\"r\" "
        expected_str += "itemprop=\"name\" autocapitalize=\"sentences\" title=\"Lirum larum attribute title\">\n</head>"
        self.assertEqual(head.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
