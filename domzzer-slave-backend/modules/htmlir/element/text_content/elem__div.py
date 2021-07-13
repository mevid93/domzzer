
import random

import modules.htmlir.attribute.utilities as autily
import modules.htmlir.element.utilities as eutily

from modules.htmlir.element.abstract.elem_element import HTMLElement


class HTMLDivElement(HTMLElement):
    """ Class representing <div> element. """

    def __init__(self, document_depth, doc_details):
        super().__init__(document_depth, doc_details)
        self.mutate()

    def mutate(self):
        # mutate global attributes
        if len(self.global_attributes) == 0:
            self.global_attributes = autily.get_random_global_attributes()
        else:
            autily.mutate_attributes(self.global_attributes)

        # mutate child elements
        if len(self.child_elements) == 0:
            self.child_elements = eutily.choose_random_elements(
                POSSIBLE_CHILD_ELEMENTS, self.document_depth - 1, self.details)
        else:
            eutily.mutate_elements(self.child_elements)

    def convert(self):
        convert_str = "<div"
        # insert id attribute
        idattr = autily.create_id_attribute(self.element_id)
        convert_str += " " + idattr.convert()

        # insert global attributes
        for ga in self.global_attributes:
            convert_str += " " + ga.convert()

        convert_str += ">\n"

        # child elements
        for ce in self.child_elements:
            convert_str += ce.convert() + "\n"

        convert_str += "</div>"
        return convert_str

    @staticmethod
    def generate(document_depth, doc_details):
        return HTMLDivElement(document_depth, doc_details)


POSSIBLE_ATTRIBUTES = []

POSSIBLE_CHILD_ELEMENTS = [
    # <a>
    # <abbr>
    # <address>
    # <article>
    # <aside>
    # <audio>
    # <b>
    # <bdo>
    # <bdi>
    # <blockquote>
    # <br>
    # <button>
    # <canvas>
    # <cite>
    # <code>
    # <command>
    # <data>
    # <datalist>
    # <del>
    # <details>
    # <dfn>
    # <div>
    # <dl>
    # <em>
    # <embed>
    # <fieldset>
    # <figure>
    # <footer>
    # <form>
    # <h1>
    # <h2>
    # <h3>
    # <h4>
    # <h5>
    # <h6>
    # <header>
    # <hgroup>
    # <hr>
    # <i>
    # <iframe>
    # <img>
    # <input>
    # <ins>
    # <kbd>
    # <keygen>
    # <label>
    # <main>
    # <map>
    # <mark>
    # <math>
    # <menu>
    # <meter>
    # <nav>
    # <noscript>
    # <object>
    # <ol>
    # <output>
    # <p>
    # <picture>
    # <pre>
    # <progress>
    # <q>
    # <ruby>
    # <s>
    # <samp>
    # <script>
    # <section>
    # <select>
    # <small>
    # <span>
    # <strong>
    # <sub>
    # <sup>
    # <svg>
    # <table>
    # <template>
    # <textarea>
    # <time>
    # <u>
    # <ul>
    # <var>
    # video
    # wbr
]
