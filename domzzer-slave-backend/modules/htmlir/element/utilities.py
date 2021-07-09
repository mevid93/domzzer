import copy
from random import randint


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
