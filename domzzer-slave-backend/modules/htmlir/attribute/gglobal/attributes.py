from random import randint

from modules.htmlir.attribute.gglobal.accesskey import HTMLAccesskeyGlobalAttribute

def get_random_global_attributes():
    """ Returns list of random global attributes

    Returns
    -------
    list: Attribute
        Random list of global attributes
    """
    number_of_attributes = randint(0, len(LIST_OF_GLOBAL_ATTRIBUTES))
    copy_of_possible_attributes = LIST_OF_GLOBAL_ATTRIBUTES.copy()
    new_attributes = []
    for i in range(number_of_attributes):
        index = randint(0, len(copy_of_possible_attributes) - 1)
        attribute_type = copy_of_possible_attributes[index]
        new_attributes.append(attribute_type.generate())
        del copy_of_possible_attributes[index]
    return new_attributes

# get list of all global attributes that have implementation
LIST_OF_GLOBAL_ATTRIBUTES = [
    HTMLAccesskeyGlobalAttribute
]