import copy
from random import randint

from modules.htmlir.element.metadata.elem_style import HTMLStyleElement


def choose_random_elements(possible_elements, document_depth, doc_details):
    """ Select random elements from list of elements.

    Function chooses random number of elements from a given list elements.
    Maximum size of the returned list is 7.

    Returns
    -------
    list[HTMLElement]
        List of elements
    """
    if (len(possible_elements) == 0):
        return []
    chosen = []
    available = copy.deepcopy(possible_elements)
    num = min(3, randint(0, len(possible_elements)))
    for i in range(num):
        index = randint(0, len(available) - 1)
        chosen.append(available[index].generate(document_depth, doc_details))
        del available[index]
    return chosen


def mutate_elements(elements):
    """ Mutate elements. 

    Function mutates each element in the given list.
    """
    for e in elements:
        e.mutate()


def create_style_element(name, document_depth, doc_details):
    """ Create style element with given css class name.

    Parameters
    ----------
    name: str
        css class name inside style element
    document_depth: int
        maximum distance from element to any leaf node
    doc_details:
        document details of the document where element belongs

    Returns
    -------
    HTMLElement
        HTML style element
    """
    return HTMLStyleElement(name, document_depth, doc_details)
