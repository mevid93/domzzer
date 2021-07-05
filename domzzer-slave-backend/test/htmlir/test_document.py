import copy
import unittest
import random

from modules.htmlir.document import HTMLDocument
from modules.htmlir.element.body import HTMLBodyElement
from modules.htmlir.element.head import HTMLHeadElement
from modules.htmlir.other.doctype import HTMLDoctype


class TestHTMLDocument(unittest.TestCase):

    def test_constructor_works(self):
        doctype = HTMLDoctype(2)
        head = HTMLHeadElement(2)
        body = HTMLBodyElement(2)
        document = HTMLDocument(document_depth=2, doctype=doctype,
                                head=head, body=body, document_id="test111")
        self.assertTrue(isinstance(document, HTMLDocument))

    def test_constructor_throws_type_error(self):
        self.assertRaises(TypeError, HTMLDocument, doctype="wrong type")

    def test_generate_works(self):
        document = HTMLDocument.generate(
            document_depth=2, document_id="test111")
        self.assertTrue(isinstance(document, HTMLDocument))

    def test_mutate_works(self):
        random.seed(666)
        document = HTMLDocument.generate(
            document_depth=2, document_id="test111")
        document_copy = copy.deepcopy(document)
        document.mutate()
        self.assertNotEqual(document.convert(), document_copy.convert())

    def test_add_css_works(self):
        pass

    def test_add_scripts_works(self):
        pass

    def test_convert_works(self):
        random.seed(666)
        self.maxDiff = None
        document = HTMLDocument.generate(
            document_depth=2, document_id="test111")
        expected_str = "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n"
        expected_str += "<head profile=\"???????????????????????????\" accesskey=\"z\" translate=\"no\" tabindex=\"\" autocapitalize=\"none\">\n"
        expected_str += "</head>\n"
        expected_str += "<body tabindex=\"11\" accesskey=\"d\" title=\"Attribute title with multiline\ntext\""
        expected_str += " spellcheck=\"false\" autocapitalize=\"on\">\n"
        expected_str += "\n"
        expected_str += "</body>"
        self.assertEqual(document.convert(), expected_str)


if __name__ == '__main__':
    unittest.main()
