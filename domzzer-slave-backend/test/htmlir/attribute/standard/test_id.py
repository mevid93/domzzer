import copy
import random
import unittest

from modules.htmlir.attribute.standard.id import HTMLIdGlobalAttribute


class TestHTMLIdGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        idattr = HTMLIdGlobalAttribute("e_0")
        self.assertEqual(idattr.id, "e_0")

    def test_generate_works(self):
        pass

    def test_mutate_works(self):
        idattr = HTMLIdGlobalAttribute("e_0")
        idattr.mutate()
        self.assertEqual(idattr.id, "e_0")

    def test_convert_works(self):
        idattr = HTMLIdGlobalAttribute("e_0")
        self.assertEqual(idattr.convert(
        ), "id=\"e_0\"")


if __name__ == '__main__':
    unittest.main()
