import copy
import random


class HTMLDocumentDetails:
    """ Class holding document information.

    This class holds document information that is crucial for
    building new elements for document.

    Methods
    -------
    get_next_id(): str
        Returns next available element id
    get_css_classes(): list[str]
        Returns random list of available css class names
    """

    def __init__(self):
        """ Constructor for HTMLDocumentDetails object. """
        # initialize with id zero
        self.id = 0
        # create css class names
        self.css_classes = []
        number_of_classes = random.randint(0, 10)
        for i in range(number_of_classes):
            classname = "myClass" + str(i)
            self.css_classes.append(classname)

    def get_next_id(self):
        """ Get next available element id.

        Returns
        -------
        str
            Next available element
        """
        self.id += 1
        return "e_" + str(self.id - 1)

    def get_css_classes(self):
        """ Returns random list of available css class names.

        Returns random list of available css class names.
        Max list size is 3. List can also be empty.

        Returns
        -------
        list
            Random list of available css class names
        """
        val = random.randint(0, 10)
        if val < 7:
            return []
        val = random.randint(0, 3)
        names = []
        available_names = copy.deepcopy(self.css_classes)
        for i in range(val):
            index = random.randint(0, len(available_names) - 1)
            names.append(available_names[index])
            del available_names[index]
        return names
