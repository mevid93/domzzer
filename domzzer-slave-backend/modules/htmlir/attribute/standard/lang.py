from random import randint

from modules.htmlir.attribute.abstract.attribute import HTMLAttribute


class HTMLLangGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global lang attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        lang_str = "lang=\""
        lang_str += self.value
        lang_str += "\""
        return lang_str

    @staticmethod
    def generate():
        lang = HTMLLangGlobalAttribute()
        lang.mutate()
        return lang


POSSIBLE_VALUES = ["ab", "aa", "af", "ak", "ak", "sq", "am", "ar", "an", "hy", "as", "av", "ae", "ay",
                   "az", "bm", "ba", "eu", "be", "bn", "bh", "bi", "bs", "br", "bg", "my", "ca", "ch",
                   "ce", "ny", "zh", "zh-Hans", "zh-Hant", "cv", "kw", "co", "cr", "hr", "cs", "da",
                   "dv", "nl", "dz", "en", "eo", "et", "ee", "fo", "fj", "fi", "fr", "ff", "gl", "gd",
                   "gv", "ka", "de", "el", "kl", "gn", "gu", "ht", "ha", "he", "hz", "hi", "ho", "hu",
                   "is", "io", "ig", "id", "in", "ia", "ie", "ie", "iu", "ik", "ga", "it", "ja", "jv",
                   "kl", "kn", "kr", "ks", "kk", "km", "ki", "rw", "rn", "ky", "kv", "kg", "ko", "ku",
                   "kj", "lo", "la", "lv", "li", "ln", "lt", "lu", "lg", "lb", "gv", "mk", "mg", "ms",
                   "ml", "mt", "mi", "mr", "mh", "mo", "mn", "na", "nv", "ng", "nd", "ne", "no", "nb",
                   "nn", "ii", "oc", "oj", "cu", "or", "om", "os", "pi", "ps", "fa", "pl", "pt", "pa",
                   "qu", "rm", "ro", "ru", "se", "sm", "sg", "sa", "sr", "sh", "st", "tn", "sn", "ii",
                   "sd", "si", "ss", "sk", "sl", "so", "nr", "es", "su", "sw", "ss", "sv", "tl", "ty",
                   "tg", "ta", "tt", "te", "th", "bo", "ti", "to", "ts", "tr", "tk", "tw", "ug", "uk",
                   "ur", "uz", "ve", "vi", "vo", "wa", "cy", "wo", "fy", "xh", "yi", "ji", "yo", "za",
                   "zu"
                   ]
