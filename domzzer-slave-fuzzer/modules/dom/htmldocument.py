import random

from modules.dom.attributes import HTML_ATTRIBUTES
from modules.dom.jshelper import *
from modules.dom.tags import HTML_TAGS
from modules.dom.tags import SVG_TAGS
from modules.dom.tags import MATHML_TAGS

class HTMLDocument:
    """ Class representing html-document.

    Provides functionality to generate new document with
    random elements, dom-api calls, and css-api calls.
    """

    def __init__(self):
        """ Constucts new HTMLDocument object instance.
        """
        self.dom_commands = []          # list of js commands (all dom api calls)
        self.html_element_ids = []      # id list of all html elements in the document (other than svg and mathml)
        self.svg_element_ids = []       # id list of all svg elements in the document
        self.mathml_element_ids = []    # id list of all mathML elements in the document
        self.canvas_element_ids = []    # id list of all canvas elements in the document

        self.dom_commands.append(declare_global_variables_js_command())

    def generate_new_element(self, element_id, var_name):
        """ Create new element
        
        Randomly generates a dom element and saves the id into correct list.
        """
        type_to_generate = None

        # get random type to generate
        if len(self.svg_element_ids) > 0 and len(self.mathml_element_ids) > 0 and len(self.canvas_element_ids) > 0:
            type_to_generate = random.choice(["HTML", "SVG", "MATHML", "CANVAS"])
        elif len(self.mathml_element_ids) > 0 and len(self.canvas_element_ids) > 0:
            type_to_generate = random.choice(["HTML", "MATHML", "CANVAS"])
        elif len(self.svg_element_ids) > 0 and len(self.canvas_element_ids) > 0:
            type_to_generate = random.choice(["HTML", "SVG", "CANVAS"])
        elif len(self.svg_element_ids) > 0 and len(self.mathml_element_ids) > 0:
            type_to_generate = random.choice(["HTML", "SVG", "MATHML"])
        elif len(self.svg_element_ids):
            type_to_generate = random.choice(["HTML", "SVG"])
        elif len(self.mathml_element_ids) > 0:
            type_to_generate = random.choice(["HTML", "MATH"])
        elif len(self.canvas_element_ids) > 0:
            type_to_generate = random.choice(["HTML", "CANVAS"])
        else:
            type_to_generate = "HTML"

        # generate an HTML element and set it to random location in the document
        if type_to_generate == "HTML":
            tag = random.choice(HTML_TAGS)
            self.dom_commands.append(generate_element_js_command(tag, element_id, var_name))
            
            # append element to document body or some random element
            if len(self.html_element_ids) > 0:
                x = random.randint(1, 10)
                if x < 2:
                    self.dom_commands.append(append_to_document_body_js_command(var_name))
                else:
                    parent_id = random.choice(self.html_element_ids)
                    self.dom_commands.append(set_as_child_element_js_command(var_name, parent_id))
            else:
                self.dom_commands.append(append_to_document_body_js_command(var_name))

            # memorize the id of the new element            
            if tag == "svg":
                self.svg_element_ids.append(element_id)
            elif tag == "math":
                self.mathml_element_ids.append(element_id)
            elif tag == "canvas":
                self.canvas_element_ids.append(element_id)
            else:
                self.html_element_ids.append(element_id)
        
        # generate an SVG element and set it to random location in the document
        elif type_to_generate == "SVG":
            tag = random.choice(SVG_TAGS)
            parent_id = random.choice(self.svg_element_ids)
            self.dom_commands.append(generate_element_js_command(tag, element_id, var_name))
            self.dom_commands.append(set_as_child_element_js_command(var_name, parent_id))
            self.svg_element_ids.append(element_id)

        # generate an MATHML element and set it to random location in the document
        elif type_to_generate == "MATHML":
            tag = random.choice(MATHML_TAGS)
            parent_id = random.choice(self.mathml_element_ids)
            self.dom_commands.append(generate_element_js_command(tag, element_id, var_name))
            self.dom_commands.append(set_as_child_element_js_command(var_name, parent_id))
            self.mathml_element_ids.append(element_id)

        # generate an CANVAS element and set it to random location in the document
        elif type_to_generate == "CANVAS":
            pass

    def generate_attribute_for_element(self, element_id):
        """ Generate one random attribute for element with given id. """ 
        attribute = random.choice(list(HTML_ATTRIBUTES.keys()))
        value_function = HTML_ATTRIBUTES[attribute]
        
        if value_function == None:
            self.dom_commands.append(try_to_add_attribute_js_command(element_id, attribute, None))
        else:
            self.dom_commands.append(try_to_add_attribute_js_command(element_id, attribute, value_function()))

    def convert(self):
        """ Convert the document into string representation.

        Returns:
            str: document in string representation 
        """
        docstr = "<!DOCTYPE html>\n"
        docstr += "<html>\n"
        docstr += "<head>\n"
        docstr += "<meta charset=\"UTF-8\">\n"
        docstr += "<title>DOMZZER</title>\n"
        docstr += "</head>\n"
        docstr += "<body>\n"
        docstr += "<script>\n"
        docstr += "\n".join(self.dom_commands)
        docstr += "</script>\n"
        docstr += "</body>\n"
        docstr += "</html>"
        return docstr        
