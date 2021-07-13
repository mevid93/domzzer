from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLStyleGlobalAttribute(HTMLAttribute):
    """ Class representing HTML document global style attribute. """

    def __init__(self):
        self.property_name = []
        self.property_value = []
        self.mutate()

    def mutate(self):
        how_many = randint(0, 3)
        self.property_name = []
        self.property_value = []
        keys = list(POSSIBLE_PROPERTIES.keys())
        count_keys = len(keys)
        for i in range(how_many):
            index = randint(0, count_keys - 1)
            key = keys[index]
            self.property_name.append(key)
            key_values = POSSIBLE_PROPERTIES[key]
            index = randint(0, len(key_values) - 1)
            value = key_values[index]
            self.property_value.append(value)

    def convert(self):
        style_str = "style=\""
        for i in range(len(self.property_name)):
            name = self.property_name[i]
            value = self.property_value[i]
            style_str += name + ":" + value + ";"
        style_str += "\""
        return style_str

    @staticmethod
    def generate():
        style = HTMLStyleGlobalAttribute()
        style.mutate()
        return style

    @staticmethod
    def get_random_css_rule():
        """ Create random css rule.

        Method creates random css rule and returns it.

        Returns
        -------
        str
            Random css rule
        """
        keys = list(POSSIBLE_PROPERTIES.keys())
        count_keys = len(keys)
        index = randint(0, count_keys - 1)
        key = keys[index]
        key_values = POSSIBLE_PROPERTIES[key]
        index = randint(0, len(key_values) - 1)
        value = key_values[index]
        return key + ":" + value + ";"


POSSIBLE_PROPERTIES = {
    "align-content": ["stretch", "center", "flex-start", "flex-end", "space-between", "space-around", "space-evenly", "initial", "inherit"],
    "align-items": ["stretch", "center", "flex-start", "flex-end", "baseline", "initial", "inherit"],
    "align-self": ["auto", "stretch", "center", "flex-start", "flex-end", "baseline", "initial", "inherit"],
    "animation-delay": ["-2", "0", "2", "initial", "inherit"],
    "animation-direction": ["normal", "reverse", "alternate", "alternate-reverse", "initial", "inherit"],
    "animation-duration": ["-2", "0", "2", "initial", "inherit"],
    "animation-fill-mode": ["none", "forwards", "backwards", "both", "initial", "inherit"],
    "animation-iteration-count": ["1", "infinite", "initial", "inherit"],
    "animation-name": ["keyframename", "none", "initial", "inherit"],
    "animation-play-state": ["paused", "running", "initial", "inherit"],
    "animation-timing-function": ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "step-start", "step-end", "steps(1)",
                                  "cubic-bezier(0,0,0,0)", "initial", "inherit"],
    "backface-visibility": ["visible", "hidden", "initial", "inherit"],
    "background-attachment": ["scroll", "fixed", "local", "initial", "inherit"],
    "background-clip": ["border-box", "padding-box", "content-box", "initial", "inherit"],
    "background-color": ["#ff0000", "transparent", "initial", "inherit"],
    "background-image": ["none", "linear-gradient()", "radial-gradient()", "repeating-linear-gradient()",
                         "repeating-radial-gradient()", "initial", "inherit"],
    "background-origin": ["padding-box", "border-box", "content-box", "initial", "inherit"],
    "background-position": ["left", "right", "top", "bottom", "left top", "left center", "right top", "right center",
                            "right bottom", "center top", "center bottom", "0% 0%", "100% 100%", "initial", "inherit"],
    "background-repeat": ["repeat", "repeat-x", "repeat-y", "no-repeat", "space", "round", "initial", "inherit"],
    "background-size": ["auto", "100%", "0% 0%", "cover", "contain", "initial", "inherit"],
    "border-bottom-color": ["#ff0000", "transparent", "initial", "inherit"],
    "border-bottom-left-radius": ["1", "10%", "initial", "inherit"],
    "border-bottom-right-radius": ["1", "10%", "initial", "inherit"],
    "border-bottom-style": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge",
                            "inset", "outset", "initial", "inherit"],
    "border-bottom-width": ["medium", "thin", "thick", "length", "initial", "inherit"],
    "border-collapse": ["separate", "collapse", "initial", "inherit"],
    "border-color": ["red green blue", "transparent", "initial", "inherit"],
    "border-image-outset": ["10px", "2", "initial", "inherit"],
    "border-image-repeate": ["stretch", "repeat", "round", "space", "initial", "inherit"],
    "border-image-slice": ["10%", "2", "fill", "initial", "inherit"],
    "border-image-source": ["none", "initial", "inherit"],
    "border-image-width": ["10px", "2", "25%", "auto", "initial", "inherit"],
    "border-left-color": ["#ff0000", "transparent", "initial", "inherit"],
    "border-left-style": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge",
                          "inset", "outset", "initial", "inherit"],
    "border-left-width": ["medium", "thin", "thick", "length", "initial", "inherit"],
    "border-radius": ["10px", "1px 2px 3px 4px", "1%", "initial", "inherit"],
    "border-right-color": ["#ff0000", "transparent", "initial", "inherit"],
    "border-right-style": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge",
                           "inset", "outset", "initial", "inherit"],
    "border-right-width": ["medium", "thin", "thick", "length", "initial", "inherit"],
    "border-spacing": ["5px", "2cm", "initial", "inherit"],
    "border-style": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge",
                     "inset", "outset", "initial", "inherit"],
    "border-top-color": ["#ff0000", "transparent", "initial", "inherit"],
    "border-top-left-radius": ["1", "10%", "initial", "inherit"],
    "border-top-right-radius": ["1", "10%", "initial", "inherit"],
    "border-top-style": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge",
                         "inset", "outset", "initial", "inherit"],
    "border-top-width": ["medium", "thin", "thick", "length", "initial", "inherit"],
    "border-width": ["medium", "thin", "thick", "length", "initial", "inherit"],
    "bottom": ["auto", "10px", "5cm", "25%", "initial", "inherit"],
    "box-shadow": ["none", "5px 10px #888888", "inset", "initial", "inherit"],
    "box-sizing": ["content-box", "border-box", "initial", "inherit"],
    "caption-side": ["top", "bottom", "initial", "inherit"],
    "clear": ["none", "left", "right", "both", "initial", "inherit"],
    "clip": ["auto", "rect(0px,60px,200px,0px)", "initial", "inherit"],
    "color": ["red", "#ff0000", "rgb(201, 76, 76)", "initial", "inherit"],
    "column-count": ["1", "5", "10", "auto", "initial", "inherit"],
    "column-fill": ["balance", "auto", "initial", "inherit"],
    "column-gap": ["40px", "normal", "initial", "inherit"],
    "column-rule-color": ["red", "#ff0000", "initial", "inherit"],
    "column-rule-style": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove",
                          "ridge", "inset", "outset", "initial", "inherit"],
    "column-rule-width": ["medium", "thin", "thick", "length", "initial", "inherit"],
    "column-span": ["none", "all", "initial", "inherit"],
    "column-width": ["auto", "100px", "initial", "inherit"],
    "columns": ["auto", "100px 3", "initial", "inherit"],
    "counter-increment": ["none", "initial", "inherit"],
    "counter-reset": ["none", "initial", "inherit"],
    "cursor": ["alias", "all-scroll", "auto", "cell", "context-menu", "col-resize", "copy", "crosshair", "default",
               "e-resize", "ew-resize", "grab", "grabbing", "help", "move", "n-resize", "ne-resize", "nesw-resize",
               "ns-resize", "nw-resize", "nwse-resize", "no-drop", "none", "not-allowed", "pointer", "progress",
               "row-resize", "s-resize", "se-resize", "sw-resize", "text", "vertical-text", "w-resize", "wait",
               "zoom-in", "zoom-out", "initial", "inherit"],
    "direction": ["ltr", "rtl", "initial", "inherit"],
    "display": ["inline", "block", "contents", "flex", "grid", "inline-block", "inline-flex", "inline-grid", "inline-table",
                "list-item", "run-in", "table", "table-caption", "table-column-group", "table-header-group", "table-footer-group",
                "table-row-group", "table-cell", "table-column", "table-row", "none", "initial", "inherit"],
    "empty-cells": ["show", "hide", "initial", "inherit"],
    "felx-basis": ["100%", "10px", "auto", "initial", "inherit"],
    "flex-direction": ["row", "row-reverse", "column", "column-reverse", "initial", "inherit"],
    "flex-grow": ["1", "0", "initial", "inherit"],
    "flex-shrink": ["1", "0", "initial", "inherit"],
    "flex-wrap": ["nowrap", "wrap", "wrap-reverse", "initial", "inherit"],
    "float": ["none", "left", "right", "initial", "inherit"],
    "font-family": ["\"Times New Roman\"", "Times", "serif", "Arial", "cursive", "Helvetica", "sans-serif", "initial", "inherit"],
    "font-size": ["medium", "xx-small", "x-small", "small", "large", "x-large", "xx-large", "smaller", "larger",
                  "10px", "10%", "initial", "inherit"],
    "font-size-adjust": ["1", "none", "initial", "inherit"],
    "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-explained", "expanded",
                     "extra-expanded", "ultra-expanded", "initial", "inherit"],
    "font-style": ["normal", "italic", "oblique", "initial", "inherit"],
    "font-variant": ["normal", "small-caps", "initial", "inherit"],
    "font-weight": ["normal", "bold", "bolder", "lighter", "100", "500", "900", "initial", "inherit"],
    "gap": ["20px 40px"],
    "grid-auto-columns": ["auto", "max-content", "min-content", "10%"],
    "grid-auto-flow": ["row", "column", "dense", "row-dense", "column dense"],
    "grid-auto-rows": ["auto", "max-content", "min-content", "10px"],
    "grid-column": ["1 / 3"],
    "grid-column-end": ["auto", "span 1"],
    "height": ["auto", "10px", "10%", "initial", "inherit"],
    "justify-content": ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "initial", "inherit"],
    "left": ["auto", "10px", "10%", "initial", "inherit"],
    "letter-spacing": ["normal", "1px", "initial", "inherit"],
    "line-height": ["normal", "2", "10px", "10%", "initial", "inherit"],
    "list-style-position": ["inside", "outside", "initial", "inherit"],
    "list-style-type": ["disc", "armenian", "circle", "cjk-ideograph", "decimal", "decimal-leading-zero", "georgian", "hebrew",
                        "hiragana", "hiragana-iroha", "katakana", "katakana-iroha", "lower-alpha", "lower-greek", "lower-latin",
                        "lower-roman", "none", "square", "upper-alpha", "upper-greek", "upper-latin", "upper-roman", "initial", "inherit"],
    "margin": ["10px 10px 10px 10px", "10px 10px 10px", "10px 10px", "10px", "10%", "auto", "initial", "inherit"],
    "margin-bottom": ["10px", "10%", "auto", "initial", "inherit"],
    "margin-left": ["10px", "-10px", "100%", "-200%", "auto", "initial", "inherit"],
    "margin-right": ["10px", "100%", "auto", "initial", "inherit"],
    "margin-top": ["10px", "-10px", "100%", "-200%", "auto", "initial", "inherit"],
    "max-height": ["none", "10px", "100%", "initial", "inherit"],
    "max-width": ["none", "10px", "100%", "initial", "inherit"],
    "min-height": ["10px", "50%", "initial", "inherit"],
    "min-width": ["10px", "50%", "initial", "inherit"],
    "opacity": ["0", "0.5", "1", "initial", "inherit"],
    "order": ["1", "2", "3", "initial", "auto"],
    "outline-color": ["invert", "#ff0000", "red", "initial", "inherit"],
    "outline-offset": ["10px", "initial", "inherit"],
    "outline-style": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "initial", "inherit"],
    "outline-width": ["medium", "thin", "thick", "10px", "initial", "inherit"],
    "overflow": ["visible", "hidden", "scroll", "auto", "initial", "inherit"],
    "overflow-x": ["visible", "hidden", "scroll", "auto", "initial", "inherit"],
    "overflow-y": ["visible", "hidden", "scroll", "auto", "initial", "inherit"],
    "padding": ["10px 10px 10px 10px", "10px 10px 10px", "10px 10px", "10px", "100%", "initial", "inherit"],
    "padding-bottom": ["10px", "10%", "initial", "inherit"],
    "padding-left": ["10px", "10%", "initial", "inherit"],
    "padding-right": ["10px", "10%", "initial", "inherit"],
    "padding-top": ["10px", "10%", "initial", "inherit"],
    "perspective": ["100px", "none", "initial", "inherit"],
    "perpective-origin": ["left", "center", "right", "10px", "10%", "top", "bottom", "10px 10px", "left top", "initial", "inherit"],
    "position": ["static", "absolute", "fixed", "relative", "sticky", "initial", "inherit"],
    "quotes": ["none", "\"'\" \"'\"", "initial", "inherit"],
    "resize": ["none", "both", "horizontal", "vertical", "initial", "inherit"],
    "right": ["auto", "10px", "10cm", "10%", "initial", "inehrit"],
    "tab-size": ["2", "4", "8", "10px", "initial", "inherit"],
    "table-layout": ["auto", "fixed", "initial", "inherit"],
    "text-align": ["left", "right", "center", "justify", "initial", "inherit"],
    "text-align-last": ["auto", "left", "right", "center", "justify", "start", "end", "initial", "inherit"],
    "text-decoration-color": ["red", "#ff0000", "initial", "inherit"],
    "text-decoration-line": ["none", "underline", "overline", "line-through", "initial", "inherit"],
    "text-decoration-style": ["solid", "double", "dotted", "dashed", "wavy", "initial", "inherit"],
    "text-indent": ["10px", "10pt", "10cm", "10em", "10%", "initial", "inherit"],
    "text-justify": ["auto", "inter-word", "inter-character", "none", "initial", "inherit"],
    "text-overflow": ["clip", "ellipsis", "initial", "inherit"],
    "text-shadow": ["2px 2px #ff0000", "none", "initial", "inherit"],
    "text-transform": ["none", "capitalize", "uppercase", "lowercase", "initial", "inherit"],
    "top": ["auto", "10px", "10cm", "10%", "initial", "inherit"],
    "transform": ["none", "rotate(20deg)", "rotateX(20deg)", "rotateY(20deg)", "skewY(20deg)", "scaleY(1.5)", "initial", "inherit"],
    "transform-origin": ["left top", "center center", "right bottom", "10px 10px", "10% 10%", "initial", "inherit"],
    "transform-style": ["flat", "preserve-3d", "initial", "inherit"],
    "transition-delay": ["2s", "4s", "initial", "inherit"],
    "transition-property": ["none", "all", "initial", "inherit"],
    "transition-timing-function": ["ease", "linear", "ease-in", "ease-out", "ease-in-out", "step-start", "step-end",
                                   "steps(1, start)", "cubic-bezier(0,1,1,0)", "initial", "inherit"],
    "vertical-align": ["baseline", "10px", "10%", "sub", "super", "top", "text-top", "middle", "bottom", "text-bottom", "initial", "inherit"],
    "visibility": ["visible", "hidden", "collapse", "initial", "inherit"],
    "white-space": ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "initial", "inherit"],
    "width": ["auto", "10px", "10cm", "10%", "initial", "inherit"],
    "word-break": ["normal", "break-all", "keep-all", "break-word", "initial", "inherit"],
    "word-spacing": ["normal", "10px", "10pt", "10cm", "10em", "initial", "inherit"],
    "word-wrap": ["normal", "break-word", "initial", "inherit"],
    "z-index": ["auto", "-2", "-1", "0", "1", "2", "initial", "inherit"],
}
