import unittest
import random

from modules.htmlir.doctype import HTMLDoctype


class TestHTMLDoctype(unittest.TestCase):

    def test_constructor_works_without_parameters(self):
        doctype = HTMLDoctype()
        self.assertEqual(doctype.type, 0)

    def test_constructor_works_with_parameter(self):
        doctype = HTMLDoctype(20)
        self.assertEqual(doctype.type, 20)

    def test_constructor_throws_value_error(self):
        self.assertRaises(ValueError, HTMLDoctype, 100)
    
    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLDoctype, "not integer")

    def test_generate_works(self):
        doctype = HTMLDoctype.generate()
        self.assertTrue(doctype.type >= 0 and doctype.type <= 20)

    def test_mutate_works(self):
        random.seed(666)
        doctype = HTMLDoctype()
        doctype.mutate()
        self.assertTrue(doctype.type != 0)

    def test_convert_works(self):
        doctype = HTMLDoctype(1)
        self.assertEqual(doctype.convert(), "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n")

if __name__ == '__main__':
    unittest.main()
