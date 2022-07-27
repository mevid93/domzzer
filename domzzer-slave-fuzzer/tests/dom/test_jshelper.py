import unittest

from modules.dom.jshelper import *


class TestJSHelper(unittest.TestCase):

    def test_declare_global_variables_js_command(self):
        result = declare_global_variables_js_command()
        expected = "var global_tmp;\n"
        self.assertEqual(result, expected)

    def test_generate_element_js_command(self):
        result = generate_element_js_command("div", "id23", "var23")
        expected = "var23 = document.createElement('div');\n"
        expected += "var23.setAttribute('id', 'id23');\n"
        self.assertEqual(result, expected)

    def test_append_to_document_body_js_command(self):
        result = append_to_document_body_js_command("var66")
        expected = "document.body.appendChild(var66);\n"
        self.assertEqual(result, expected)

    def test_set_as_child_element_js_command(self):
        result = set_as_child_element_js_command("var66", "id23")
        expected = "global_tmp = document.getElementById('id23');\n"
        expected += "global_tmp.appendChild(var66);\n"
        self.assertEqual(result, expected)
    
    def test_try_to_add_attribute_js_command(self):
        result = try_to_add_attribute_js_command("id23", "bgcolor", "green")
        expected = "try {\n"
        expected += "global_tmp = document.getElementById('id23');\n"
        expected += "global_tmp.setAttribute('bgcolor', 'green');\n"
        expected += "} catch (error) { }\n"
        self.assertEqual(result, expected)