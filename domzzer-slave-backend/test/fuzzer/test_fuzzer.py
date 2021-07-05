import copy
import random
import unittest

from modules.fuzzer.fuzzer import Fuzzer
from modules.generator.generator import Generator


class TestFuzzer(unittest.TestCase):

    def test_constructor_works(self):
        generator = Generator()
        fuzzer = Fuzzer(generator, [], "http://localhost:3002/")
        self.assertTrue(isinstance(fuzzer, Fuzzer))

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, Fuzzer, "wrong type",
                          [], "http://localhost:3002/")

    def test_constructor_throws_value_error(self):
        self.assertRaises(ValueError, Fuzzer, None,
                          [], "http://localhost:3002/")

    def test_run_works(self):
        pass


if __name__ == '__main__':
    unittest.main()
