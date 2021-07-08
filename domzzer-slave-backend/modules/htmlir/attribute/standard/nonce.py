import random

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLNonceGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global nonce attribute. """

    def mutate(self):
        self.value = str(hex(random.getrandbits(128)))

    def convert(self):
        nonce_str = "nonce=\""
        nonce_str += self.value
        nonce_str += "\""
        return nonce_str

    @staticmethod
    def generate():
        nonce = HTMLNonceGlobalAttribute()
        nonce.mutate()
        return nonce
