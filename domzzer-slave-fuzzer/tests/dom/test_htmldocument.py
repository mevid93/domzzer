import unittest

from modules.dom.htmldocument import HTMLDocument


class TestHTMLDocument(unittest.TestCase):

    def test_html_document_converts_correctly_when_it_is_empty(self):
        document = HTMLDocument()
        result = document.convert()

        expected = "<!DOCTYPE html>\n"
        expected += "<html>\n"
        expected += "<head>\n"
        expected += "<meta charset=\"UTF-8\">\n"
        expected += "<title>DOMZZER</title>\n"
        expected += "</head>\n"
        expected += "<body>\n"
        expected += "<script>\n"
        expected += "var global_tmp;\n"
        expected += "</script>\n"
        expected += "</body>\n"
        expected += "</html>"

        self.assertEqual(result, expected)
