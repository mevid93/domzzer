import copy
import random
import unittest

from modules.htmlir.attribute.standard.a_class import HTMLClassGlobalAttribute


class TestHTMLClassGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        names = ["myClass1", "myClass2", "myClass3"]
        attr = HTMLClassGlobalAttribute(names)
        self.assertEqual(attr.classes, names)

    def test_generate_works(self):
        pass

    def test_mutate_works(self):
        random.seed(1)
        names = ["myClass1", "myClass2", "myClass3"]
        attr = HTMLClassGlobalAttribute(names)
        attr.mutate()
        self.assertEqual(attr.classes, names)

    def test_convert_works(self):
        names = ["myClass1", "myClass2", "myClass3"]
        attr = HTMLClassGlobalAttribute(names)
        self.assertEqual(attr.convert(
        ), "class=\"myClass1 myClass2 myClass3\"")


if __name__ == '__main__':
    unittest.main()
