import copy
import random
import unittest

from modules.htmlir.attribute.standard.nonce import HTMLNonceGlobalAttribute


class TestHTMLNonceGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        nonce = HTMLNonceGlobalAttribute()
        self.assertEqual(nonce.value, "0xcd613e30d8f16adf91b7584a2265b1f5")

    def test_generate_works(self):
        random.seed(33)
        nonce = HTMLNonceGlobalAttribute.generate()
        self.assertEqual(nonce.value, "0x7a9d969146fc8893d73c43fad1272a25")

    def test_mutate_works(self):
        random.seed(6)
        nonce = HTMLNonceGlobalAttribute()
        nonce_copy = copy.deepcopy(nonce)
        nonce.mutate()
        self.assertNotEqual(nonce.value, nonce_copy.value)

    def test_convert_works(self):
        random.seed(666)
        nonce = HTMLNonceGlobalAttribute()
        self.assertEqual(nonce.convert(
        ), "nonce=\"0x6084b9e8e7402fb4fb5a463f74c441d7\"")


if __name__ == '__main__':
    unittest.main()
