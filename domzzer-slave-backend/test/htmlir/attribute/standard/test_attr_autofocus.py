import copy
import random
import unittest

from modules.htmlir.attribute.standard.attr_autofocus import HTMLAutofocusGlobalAttribute


class TestHTMLAutofocusGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(666)
        autofocus = HTMLAutofocusGlobalAttribute()
        self.assertEqual(autofocus.value, "true")

    def test_generate_works(self):
        random.seed(33)
        autofocus = HTMLAutofocusGlobalAttribute.generate()
        self.assertTrue(autofocus.value != None)

    def test_mutate_works(self):
        random.seed(6)
        autofocus = HTMLAutofocusGlobalAttribute()
        autofocus_copy = copy.deepcopy(autofocus)
        autofocus.mutate()
        self.assertNotEqual(autofocus.value, autofocus_copy.value)

    def test_convert_works(self):
        random.seed(666)
        autofocus = HTMLAutofocusGlobalAttribute()
        self.assertEqual(autofocus.convert(
        ), "autofocus")


if __name__ == '__main__':
    unittest.main()
