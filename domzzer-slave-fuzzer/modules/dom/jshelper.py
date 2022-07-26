
def declare_global_variables_js_command():
    """ Returns a js command for declaring global variables.
    
        Returns:
        str: the js command
    """
    command = "var global_tmp;\n"
    return command

def generate_element_js_command(tag, element_id, var_name):
    """ Returns a js command for generating dom element. 
    
        Returns:
        str: the js command
    """
    command = var_name + " = document.createElement('" + tag + "');\n"
    command += var_name + ".setAttribute('id', '" + element_id + "');\n"
    return command


def append_to_document_body_js_command(var_name):
    """ Returns a js command for appending element to document body. 
    
        Returns:
        str: the js command
    """
    return "document.body.appendChild(" + var_name + ");\n"


def set_as_child_element_js_command(var_name, parent_id):
    """ Returns a js command for setting element as child for parent element. 
    
        Returns:
        str: the js command
    """
    command = "global_tmp = document.getElementById('" + parent_id + "');\n"
    command += "global_tmp.appendChild(" + var_name + ");\n"
    return command

def try_to_add_attribute_js_command(element_id, attribute_name, attribute_value):
    """ Returns a js command for setting element attribute value. 
    
        Returns:
        str: the js command
    """
    command = "try {\n"
    command += "global_tmp = document.getElementById('" + element_id + "');\n"
    command += "global_tmp.setAttribute('" + attribute_name + "', "
    command += "'" + attribute_value + "'" if attribute_value != None else "''"
    command += ");\n"
    command += "} catch (error) { }\n"
    return command
