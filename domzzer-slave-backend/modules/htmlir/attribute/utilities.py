from random import randint

from modules.htmlir.attribute.standard.accesskey import HTMLAccesskeyGlobalAttribute
from modules.htmlir.attribute.standard.autocapitalize import HTMLAutocapitalizeGlobalAttribute
from modules.htmlir.attribute.standard.autofocus import HTMLAutofocusGlobalAttribute
from modules.htmlir.attribute.standard.dir import HTMLDirGlobalAttribute
from modules.htmlir.attribute.standard.draggable import HTMLDraggableGlobalAttribute
from modules.htmlir.attribute.standard.enterkeyhint import HTMLEnterkeyhintGlobalAttribute
from modules.htmlir.attribute.standard.hidden import HTMLHiddenGlobalAttribute
from modules.htmlir.attribute.standard.inputmode import HTMLInputmodeGlobalAttribute
from modules.htmlir.attribute.standard.spellcheck import HTMLSpellcheckGlobalAttribute
from modules.htmlir.attribute.standard.tabindex import HTMLTabindexGlobalAttribute
from modules.htmlir.attribute.standard.title import HTMLTitleGlobalAttribute
from modules.htmlir.attribute.standard.translate import HTMLTranslateGlobalAttribute


def get_random_global_attributes():
    """ Returns list of random global attributes

    Returns a list of random global attributes. 
    The maximum size of the list is limited to 4 attributes.

    Returns
    -------
    list: Attribute
        Random list of global attributes
    """
    max_number = min(4, len(GLOBAL_ATTRIBUTES))
    number_of_attributes = randint(0, max_number)
    copy_of_possible_attributes = GLOBAL_ATTRIBUTES.copy()
    new_attributes = []
    for i in range(number_of_attributes):
        index = randint(0, len(copy_of_possible_attributes) - 1)
        attribute_type = copy_of_possible_attributes[index]
        new_attributes.append(attribute_type.generate())
        del copy_of_possible_attributes[index]
    return new_attributes


# list of all global attributes that have implementation
# and can be used freely by all elements
GLOBAL_ATTRIBUTES = [
    HTMLAccesskeyGlobalAttribute,
    HTMLAutocapitalizeGlobalAttribute,
    HTMLAutofocusGlobalAttribute,
    HTMLDirGlobalAttribute,
    HTMLDraggableGlobalAttribute,
    HTMLEnterkeyhintGlobalAttribute,
    HTMLHiddenGlobalAttribute,
    HTMLInputmodeGlobalAttribute,
    HTMLSpellcheckGlobalAttribute,
    HTMLTabindexGlobalAttribute,
    HTMLTitleGlobalAttribute,
    HTMLTranslateGlobalAttribute,
]
