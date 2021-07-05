import unittest

from modules.fuzzer.config import Config


class TestConfig(unittest.TestCase):

    def test_constructor_works(self):
        pass

    def test_get_server_username_works(self):
        pass

    def test_get_server_password_works(self):
        pass

    def test_get_server_port_works(self):
        pass

    def test_get_browsers_works(self):
        config = Config()
        browsers = config.get_browsers()
        self.assertEqual(len(browsers.keys()), 0)


if __name__ == '__main__':
    unittest.main()
