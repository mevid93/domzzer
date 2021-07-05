import random
import unittest

from modules.htmlir.attribute.gglobal.attributes import get_random_global_attributes


class TestGetRandomGlobalAttributes(unittest.TestCase):

    def test_function_works(self):
        random.seed(5)
        attributes = get_random_global_attributes()
        self.assertEqual(len(attributes), 4)

if __name__ == '__main__':
    unittest.main()
