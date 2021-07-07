import copy
import unittest
import random

from modules.generator.generator import Generator
from modules.htmlir.document import HTMLDocument


class TestGenerator(unittest.TestCase):

    def test_generate_new_document_works(self):
        document = Generator.generate_new_document(
            document_id="test111", document_depth=2)
        self.assertTrue(isinstance(document, HTMLDocument))

    def test_generate_new_document_throws_type_error(self):
        self.assertRaises(
            TypeError, Generator.generate_new_document, 123)

    def test_generate_new_document_throws_value_error(self):
        self.assertRaises(
            ValueError, Generator.generate_new_document, None)

    def test_mutate_existing_document_works(self):
        random.seed(55)
        document = Generator.generate_new_document(
            document_id="test111", document_depth=2)
        document_copy = copy.deepcopy(document)
        mutated_document = Generator.mutate_existing_document(document)
        self.assertNotEqual(document_copy.convert(),
                            mutated_document.convert())

    def test_mutate_existing_document_throws_type_error(self):
        self.assertRaises(
            TypeError, Generator.mutate_existing_document, "wrong type")

    def test_mutate_existing_document_throws_value_error(self):
        self.assertRaises(ValueError, Generator.mutate_existing_document, None)

    def test_convert_existing_document_works(self):
        random.seed(55)
        document = Generator.generate_new_document(
            document_id="test111", document_depth=2)
        converted_str = Generator.convert_existing_document(document)
        expected_str = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n"
        expected_str += "<head translate=\"\">\n"
        expected_str += "</head>\n"
        expected_str += "<body autocapitalize=\"characters\" translate=\"no\">\n"
        expected_str += "\n"
        expected_str += "</body>"
        self.assertEqual(converted_str, expected_str)

    def test_convert_existing_document_throws_type_error(self):
        self.assertRaises(
            TypeError, Generator.convert_existing_document, "wrong type")

    def test_convert_existing_document_throws_value_error(self):
        self.assertRaises(ValueError, Generator.mutate_existing_document, None)


if __name__ == '__main__':
    unittest.main()
