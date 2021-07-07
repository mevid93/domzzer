import copy
import random
import unittest

from modules.htmlir.attribute.standard.contenteditable import HTMLContenteditableGlobalAttribute


class TestHTMLContenteditableGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(3)
        contenteditable = HTMLContenteditableGlobalAttribute()
        self.assertEqual(contenteditable.value, "")

    def test_generate_works(self):
        random.seed(33)
        conteneditable = HTMLContenteditableGlobalAttribute.generate()
        self.assertEqual(conteneditable.value, "")

    def test_mutate_works(self):
        random.seed(6)
        contenteditable = HTMLContenteditableGlobalAttribute()
        contenteditable_copy = copy.deepcopy(contenteditable)
        contenteditable.mutate()
        self.assertNotEqual(contenteditable.value, contenteditable_copy.value)

    def test_convert_works(self):
        random.seed(666)
        contenteditable = HTMLContenteditableGlobalAttribute()
        self.assertEqual(contenteditable.convert(
        ), "contenteditable=\"true\"")


if __name__ == '__main__':
    unittest.main()
