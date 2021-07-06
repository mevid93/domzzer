import copy
import random
import unittest

from modules.htmlir.attribute.standard.hidden import HTMLHiddenGlobalAttribute


class TestHTMLHiddenGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        hidden = HTMLHiddenGlobalAttribute()
        self.assertEqual(hidden.value, "yes")

    def test_generate_works(self):
        random.seed(33)
        hidden = HTMLHiddenGlobalAttribute.generate()
        self.assertEqual(hidden.value, "yes")

    def test_mutate_works(self):
        random.seed(666)
        hidden = HTMLHiddenGlobalAttribute()
        hidden_copy = copy.deepcopy(hidden)
        hidden.mutate()
        self.assertEqual(hidden.value, hidden_copy.value)

    def test_convert_works(self):
        random.seed(6)
        accesskey = HTMLHiddenGlobalAttribute()
        self.assertEqual(accesskey.convert(
        ), "hidden")


if __name__ == '__main__':
    unittest.main()
