import copy
import random
import unittest

from modules.htmlir.attribute.standard.title import HTMLTitleGlobalAttribute


class TestHTMLTitleGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        title = HTMLTitleGlobalAttribute()
        self.assertEqual(title.value, "Another title for attribute")

    def test_generate_works(self):
        random.seed(33)
        title = HTMLTitleGlobalAttribute.generate()
        self.assertEqual(title.value, "Lirum larum attribute title")

    def test_mutate_works(self):
        random.seed(6)
        title = HTMLTitleGlobalAttribute.generate()
        title_copy = copy.deepcopy(title)
        title.mutate()
        self.assertNotEqual(title.value, title_copy.value)

    def test_convert_works(self):
        random.seed(666)
        title = HTMLTitleGlobalAttribute()
        self.assertEqual(title.convert(
        ), "title=\"???????????????????+\"")


if __name__ == '__main__':
    unittest.main()
