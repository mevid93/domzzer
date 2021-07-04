from random import randint


class HTMLDoctype:
    """ Class representing HTML document type declaration.

    There are multiple document types that can be selected by providing
    correct parameter to constructor. It is also possible to leave the 
    document type empty and let the constructor use default value 1:
    0. HTML5
    1. HTML 4.01 - Strict
    2. HTML 4.01 - Trnasitional
    3. HTML 4.01 - Frameset
    4. XHTML 1.0 - Strict
    5. XHTML 1.0 - Transitional
    6. XHTML 1.0 - Frameset
    7. XHTML 1.1 - DTD
    8. XHTML 1.1 - Basic
    9. MathML 2.0 - DTD
    10. MathML 1.01 - DTD
    11. XHTML + MathML + SVG - DTD
    12. XHTML + MathML + SVG Profile (XHTML as host language) - DTD
    13. XHTML + MathML + SVG Profile (Using SVG as the host) - DTD
    14. SVG 1.1 Full - DTD
    15. SVG 1.0 - DTD
    16. SVG 1.1 Basic - DTD
    17. SVG 1.1 Tiny - DTD
    18. HTML 2.0 - DTD
    19. HTML 3.2 - DTD
    20. XHTML Basic 1.0 - DTD

    Attributes
    ----------
    document_type: integer, optional
        HTMLDocument type (default is 1)

    Methods
    -------
    mutate()
        Mutates the HTMLDoctype
    convert()
        Converts HTMLDoctype object into real HTML code

    Static methods
    --------------
    generate()
        Generates random HTMLDoctype object and returns it
    """

    def __init__(self, document_type=0):
        """ Constructor for HTMLDoctype object.

        Takes optional parameter document_type (integer from 0 to 20) as input.
        If no parameter is given, the default value is used instead.
        Raises error, if parameter provided is not integer.

        Parameters
        ----------
        document_type: integer, optional
            HTML document type declaration (default is None)
        """
        if document_type == None or isinstance(document_type, int) and (document_type < 0 or document_type > 20):
            raise ValueError
        if document_type != None and not isinstance(document_type, int):
            raise TypeError
        self.document_type = document_type

    def mutate(self):
        """ Mutates the HTMLDocument. 

        Randomly changes the document type to another.
        """
        new_type = randint(0, len(LIST_OF_POSSIBLE_DOCTYPES) - 1)
        self.document_type = new_type

    def convert(self):
        """ Returns HTMLDoctype as string.

        This method converts HTMLDoctype object into real HTML code.

        Returns
        -------
        str
            a string of real HTML code
        """
        type_str = LIST_OF_POSSIBLE_DOCTYPES[self.document_type]
        return type_str

    @staticmethod
    def generate():
        """ Generates random HTMLDoctype.

        Method generates random HTMLDoctype object and returns it.

        Returns
        -------
        HTMLDoctype
            Randomly generated doctype
        """
        index = randint(0, len(LIST_OF_POSSIBLE_DOCTYPES) - 1)
        return HTMLDoctype(index)


# list of all possible doctypes
LIST_OF_POSSIBLE_DOCTYPES = [
    "<!DOCTYPE html>",  # 0
    "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">",  # 1
    "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">",  # 2
    "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\">",  # 3
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">",  # 4
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">",  # 5
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\">",  # 6
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">",  # 7
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML Basic 1.1//EN\" \"http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd\">",  # 8
    "<!DOCTYPE math PUBLIC \"-//W3C//DTD MathML 2.0//EN\" \"http://www.w3.org/Math/DTD/mathml2/mathml2.dtd\">",  # 9
    "<!DOCTYPE math SYSTEM \"http://www.w3.org/Math/DTD/mathml1/mathml.dtd\">",  # 10
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1 plus MathML 2.0 plus SVG 1.1//EN\" \"http://www.w3.org/2002/04/xhtml-math-svg/xhtml-math-svg.dtd\">",  # 11
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1 plus MathML 2.0 plus SVG 1.1//EN\" \"http://www.w3.org/2002/04/xhtml-math-svg/xhtml-math-svg.dtd\">",  # 12
    "<!DOCTYPE svg:svg PUBLIC \"-//W3C//DTD XHTML 1.1 plus MathML 2.0 plus SVG 1.1//EN\" \"http://www.w3.org/2002/04/xhtml-math-svg/xhtml-math-svg.dtd\">",  # 13
    "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">",  # 14
    "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.0//EN\" \"http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd\">",  # 15
    "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1 Basic//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-basic.dtd\">",  # 16
    "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1 Tiny//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd\">",  # 17
    "<!DOCTYPE html PUBLIC \"-//IETF//DTD HTML 2.0//EN\">",  # 18
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 3.2 Final//EN\">",  # 19
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML Basic 1.0//EN\" \"http://www.w3.org/TR/xhtml-basic/xhtml-basic10.dtd\">",  # 20
]
