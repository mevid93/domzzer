from random import randint

from modules.htmlir.attribute.profile import HTMLProfileAttribute
from modules.htmlir.element.base import HTMLBaseElement
from modules.htmlir.element.element import HTMLElement
from modules.htmlir.element.link import HTMLLinkElement
from modules.htmlir.element.meta import HTMLMetaElement
from modules.htmlir.element.noscript import HTMLNoscriptElement
from modules.htmlir.element.script import HTMLScriptElement
from modules.htmlir.element.style import HTMLStyleElement
from modules.htmlir.element.template import HTMLTemplateElement
from modules.htmlir.element.title import HTMLTitleElement


class HTMLHeadElement(HTMLElement):
    """ Class representing HTML document head element.

    HTML head element can have one attribute (profile) and eight
    different child elements. List of supported child elements:
    0. <title>
    1. <base>
    2. <link>
    3. <style>
    4. <meta>
    5. <script>
    6. <noscript>
    7. <template>

    Attributes
    ----------
    element_title: HTMLElementTitle, optional
        HTML title element (default is None)
    element_base: HTMLElementBase, optional
        HTML base element (default is None)
    element_link: HTMLElementLink, optional
        HTML link element (default is None)
    element_style: HTMLElementStyle, optional
        HTML style element (default is None)
    element_meta: HTMLElementMeta, optional
        HTML meta element (default is None)
    element_script: HTMLElementScript, optional
        HTML script element (default is None)
    element_noscript: HTMLElementNoscript, optional
        HTML noscript element (default is None)
    element_template: HTMLElementTemplate, optional
        HTML template element (default is None)
    attribute_profile: HTMLAttributeProfile, optional
        HTML attribute profile (default is None)
    """

    def __init__(self, title=None, base=None, link=None, style=None, meta=None,
                 script=None, noscript=None, template=None, profile=None):
        """ Constructor for HTMLElementHead object.

        Parameters
        ----------
        title: HTMLElementTitle, optional
            HTML title element (default is None)
        base: HTMLElementBase, optional
            HTML base element (default is None)
        link: HTMLElementLink, optional
            HTML link element (default is None)
        style: HTMLElementStyle, optional
            HTML style element (default is None)
        meta: HTMLElementMeta, optional
            HTML meta element (default is None)
        script: HTMLElementScript, optional
            HTML script element (default is None)
        noscript: HTMLElementNoscript, optional
            HTML noscript element (default is None)
        template: HTMLElementTemplate, optional
            HTML template element (default is None)
        profile: HTMLAttributeProfile, optional
            HTML attribute profile (default is None)
        """
        self.element_title = None
        self.element_base = None
        self.element_link = None
        self.element_style = None
        self.element_meta = None
        self.element_script = None
        self.element_noscript = None
        self.element_template = None
        self.attribute_profile = None

        if title != None:
            if not isinstance(title, HTMLTitleElement):
                raise TypeError
            self.element_title = title
        if base != None:
            if not isinstance(base, HTMLBaseElement):
                raise TypeError
            self.element_base = base
        if link != None:
            if not isinstance(link, HTMLLinkElement):
                raise TypeError
            self.element_link = link
        if style != None:
            if not isinstance(style, HTMLStyleElement):
                raise TypeError
            self.element_style = style
        if meta != None:
            if not isinstance(meta, HTMLMetaElement):
                raise TypeError
            self.element_meta = meta
        if script != None:
            if not isinstance(script, HTMLScriptElement):
                raise TypeError
            self.element_script = script
        if noscript != None:
            if not isinstance(noscript, HTMLNoscriptElement):
                raise TypeError
            self.element_noscript = noscript
        if template != None:
            if not isinstance(template, HTMLTitleElement):
                raise TypeError
            self.element_template = template
        if profile != None:
            if not isinstance(profile, HTMLProfileAttribute):
                raise TypeError
            self.attribute_profile = profile

    def get_child_elements(self):
        elements = []
        if self.element_title != None:
            elements.append(self.element_title)
        if self.element_base != None:
            elements.append(self.element_base)
        if self.element_link != None:
            elements.append(self.element_link)
        if self.element_style != None:
            elements.append(self.element_style)
        if self.element_meta != None:
            elements.append(self.element_meta)
        if self.element_script != None:
            elements.append(self.element_script)
        if self.element_noscript != None:
            elements.append(self.element_noscript)
        if self.element_template != None:
            elements.append(self.element_template)
        return elements

    def get_attributes(self):
        attributes = []
        if self.attribute_profile != None:
            attributes.append(self.attribute_profile)
        return attributes
    
    def get_text(self):
        return None

    def mutate(self):
        # first decide whether profile attribute should be set or not
        self.attribute_profile = None
        r = randint(0, 1)
        self.attribute_profile = HTMLProfileAttribute.generate() if r == 1 else None

        # then choose random child elements
        number_of_elements = randint(0, 8)
        possible_elements = [
            "title",
            "base",
            "link",
            "style",
            "meta",
            "script",
            "noscript",
            "template"
        ]

        self.element_title = None
        self.element_base = None
        self.element_link = None
        self.element_style = None
        self.element_meta = None
        self.element_script = None
        self.element_noscript = None
        self.element_template = None

        for x in range(number_of_elements):
            index = randint(0, len(possible_elements)-1)
            value = possible_elements[index]
            if value == "title":
                self.element_title = HTMLTitleElement.generate()
            elif value == "base":
                self.element_base = HTMLBaseElement.generate()
            elif value == "link":
                self.element_link = HTMLLinkElement.generate()
            elif value == "style":
                self.element_style = HTMLStyleElement.generate()
            elif value == "meta":
                self.element_meta = HTMLMetaElement.generate()
            elif value == "script":
                self.element_script = HTMLScriptElement.generate()
            elif value == "noscript":
                self.element_noscript = HTMLNoscriptElement.generate()
            elif value == "template":
                self.element_template = HTMLTemplateElement.generate()

            del possible_elements[index]

    def convert(self):
        head_str = "<head"
        head_str += " " + self.attribute_profile.convert() if self.attribute_profile != None else ""
        head_str += ">\n"
        head_str += self.element_title.convert() if self.element_title != None else ""
        head_str += self.element_base.convert() if self.element_base != None else ""
        head_str += self.element_link.convert() if self.element_link != None else ""
        head_str += self.element_style.convert() if self.element_style != None else ""
        head_str += self.element_meta.convert() if self.element_meta != None else ""
        head_str += self.element_script.convert() if self.element_script != None else ""
        head_str += self.element_noscript.convert() if self.element_noscript != None else ""
        head_str += self.element_template.convert() if self.element_template != None else ""
        head_str += "</head>"
        return head_str

    @staticmethod
    def generate():
        head = HTMLHeadElement()
        head.mutate()
        return head
