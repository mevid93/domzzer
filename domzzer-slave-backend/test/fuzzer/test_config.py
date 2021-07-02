import unittest

from modules.fuzzer.config import Config

class TestConfig(unittest.TestCase):

    def setUp(self):
        self.config = Config(None)
        return super().setUp()

    def test_get_browsers(self):
        browsers = self.config.get_browsers()
        self.assertEqual(len(browsers.keys()), 0)

if __name__ == '__main__':
    unittest.main()