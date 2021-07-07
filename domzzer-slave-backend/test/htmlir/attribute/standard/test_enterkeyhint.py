import copy
import random
import unittest

from modules.htmlir.attribute.standard.enterkeyhint import HTMLEnterkeyhintGlobalAttribute


class TestHTMLEnterkeyhintGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(666)
        enterkeyhint = HTMLEnterkeyhintGlobalAttribute()
        self.assertEqual(enterkeyhint.value, "next")

    def test_generate_works(self):
        random.seed(33)
        enterkeyhint = HTMLEnterkeyhintGlobalAttribute.generate()
        self.assertTrue(enterkeyhint.value != None)

    def test_mutate_works(self):
        random.seed(6)
        enterkeyhint = HTMLEnterkeyhintGlobalAttribute()
        enterkeyhint_copy = copy.deepcopy(enterkeyhint)
        enterkeyhint.mutate()
        self.assertNotEqual(enterkeyhint.value, enterkeyhint_copy.value)

    def test_convert_works(self):
        random.seed(666)
        enterkeyhint = HTMLEnterkeyhintGlobalAttribute()
        self.assertEqual(enterkeyhint.convert(
        ), "enterkeyhint=\"next\"")


if __name__ == '__main__':
    unittest.main()
