import copy
import random
import unittest

from modules.htmlir.attribute.standard.inputmode import HTMLInputmodeGlobalAttribute


class TestHTMLInputmodeGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        inputmode = HTMLInputmodeGlobalAttribute()
        self.assertEqual(inputmode.value, "decimal")

    def test_generate_works(self):
        random.seed(33)
        inputmode = HTMLInputmodeGlobalAttribute.generate()
        self.assertEqual(inputmode.value, "numeric")

    def test_mutate_works(self):
        random.seed(666)
        inputmode = HTMLInputmodeGlobalAttribute()
        inputmode_copy = copy.deepcopy(inputmode)
        inputmode.mutate()
        self.assertNotEqual(inputmode.value, inputmode_copy.value)

    def test_convert_works(self):
        random.seed(666)
        accesskey = HTMLInputmodeGlobalAttribute()
        self.assertEqual(accesskey.convert(
        ), "inputmode=\"url\"")


if __name__ == '__main__':
    unittest.main()
