import random
import unittest

from modules.htmlir.attribute.standard.spellcheck import HTMLSpellcheckGlobalAttribute


class TestHTMLSpellcheckGlobalAttribute(unittest.TestCase):

    def test_constructor_works(self):
        random.seed(1)
        spellcheck = HTMLSpellcheckGlobalAttribute()
        self.assertEqual(spellcheck.value, "false")

    def test_generate_works(self):
        random.seed(33)
        spellcheck = HTMLSpellcheckGlobalAttribute.generate()
        self.assertEqual(spellcheck.value, "false")

    def test_mutate_works(self):
        random.seed(666)
        spellcheck = HTMLSpellcheckGlobalAttribute()
        spellcheck.mutate()
        self.assertEqual(spellcheck.value, "true")

    def test_convert_works(self):
        random.seed(666)
        accesskey = HTMLSpellcheckGlobalAttribute()
        self.assertEqual(accesskey.convert(
        ), "spellcheck=\"true\"")


if __name__ == '__main__':
    unittest.main()
