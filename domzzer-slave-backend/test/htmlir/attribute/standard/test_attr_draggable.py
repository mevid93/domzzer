import copy
import random
import unittest

from modules.htmlir.attribute.standard.attr_draggable import HTMLDraggableGlobalAttribute


class TestHTMLDraggableGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(666)
        draggable = HTMLDraggableGlobalAttribute()
        self.assertEqual(draggable.value, "true")

    def test_generate_works(self):
        random.seed(33)
        draggable = HTMLDraggableGlobalAttribute.generate()
        self.assertTrue(draggable.value != None)

    def test_mutate_works(self):
        random.seed(6)
        draggable = HTMLDraggableGlobalAttribute()
        draggable_copy = copy.deepcopy(draggable)
        draggable.mutate()
        self.assertNotEqual(draggable.value, draggable_copy.value)

    def test_convert_works(self):
        random.seed(666)
        draggable = HTMLDraggableGlobalAttribute()
        self.assertEqual(draggable.convert(
        ), "draggable=\"true\"")


if __name__ == '__main__':
    unittest.main()
