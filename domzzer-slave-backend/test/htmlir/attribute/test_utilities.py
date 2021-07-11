import copy
import random
import unittest

import modules.htmlir.attribute.utilities as autily


class TestAttributeUtilities(unittest.TestCase):

    def test_get_random_global_attributes_works(self):
        random.seed(5)
        attributes = autily.get_random_global_attributes()
        self.assertEqual(len(attributes), 4)

    def test_choose_random_attributes_works(self):
        random.seed(17)
        ga = autily.get_random_global_attributes()
        a = autily.choose_random_attributes(ga)
        self.assertEqual(len(a), 1)

    def test_mutate_attributes_works(self):
        random.seed(1)
        ga = autily.get_random_global_attributes()
        ga_copy = copy.deepcopy(ga)
        autily.mutate_attributes(ga)
        self.assertNotEqual(ga[0].convert(), ga_copy[0].convert())

    def test_create_id_attribute_works(self):
        eid = "e_0"
        attr = autily.create_id_attribute(eid)
        self.assertEqual(attr.convert(), "id=\"e_0\"")

    def test_create_class_attribute_works(self):
        names = ["myClass1", "myClass2"]
        attr = autily.create_class_attribute(names)
        self.assertEqual(attr.convert(), "class=\"myClass1 myClass2\"")


if __name__ == '__main__':
    unittest.main()
