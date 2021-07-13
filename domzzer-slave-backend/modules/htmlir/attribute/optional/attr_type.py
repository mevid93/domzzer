from random import randint

from modules.htmlir.attribute.abstract.attr_attribute import HTMLAttribute


class HTMLTypeAttribute(HTMLAttribute):
    """ Class representing HTML type attribute. """

    def mutate(self):
        index = randint(0, len(POSSIBLE_VALUES) - 1)
        self.value = POSSIBLE_VALUES[index]

    def convert(self):
        type_str = "type=\""
        type_str += self.value
        type_str += "\""
        return type_str

    @staticmethod
    def generate():
        t = HTMLTypeAttribute()
        t.mutate()
        return t


POSSIBLE_VALUES = [
    "application/atom+xml",
    "application/vnd.dart",
    "application/ecmascript",
    "application/EDI-X12",
    "application/EDIFACT",
    "application/json",
    "application/javascript",
    "application/octet-stream",
    "application/ogg",
    "application/dash+xml",
    "application/pdf",
    "application/postscript",
    "application/rdf+xml",
    "application/rss+xml",
    "application/soap+xml",
    "application/font-woff",
    "application/xhtml+xml",
    "application/xml",
    "application/xml-dtd",
    "application/xop+xml",
    "application/zip",
    "application/gzip",
    "application/smil+xml",
    "application/vnd.android.package-archive",
    "application/vnd.debian.binary-package",
    "application/vnd.google-earth.kml+xml",
    "application/vnd.google-earth.kmz",
    "application/vnd.mozilla.xul+xml",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
    "application/vnd.ms-xpsdocument",
    "application/vnd.oasis.opendocument.text",
    "application/vnd.oasis.opendocument.spreadsheet",
    "application/vnd.oasis.opendocument.presentation",
    "application/vnd.oasis.opendocument.graphics",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.presenationml.presentation",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/x-7z-compressed",
    "application/x-chrome-extension",
    "application/x-dvi",
    "application/x-font-ttf",
    "application/x-javascript",
    "application/x-latex",
    "application/x-mpegURL",
    "application/x-rar-compressed",
    "application/x-shockwave-flash",
    "application/x-stuffit",
    "application/x-tar",
    "application/x-www-form-urlencoded",
    "application/x-xpinstall",
    "application/x-nacl",
    "application/x-pnacl",
    "application/x-pkcs12",
    "audio/basic",
    "audio/L24",
    "audio/mp4",
    "audio/mpeg",
    "audio/ogg",
    "audio/flac",
    "audio/opus",
    "audio/vorbis",
    "audio/vnd.rn-realaudio",
    "audio/vnd.wave",
    "audio/x-aac",
    "audio/x-caf",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/bmp",
    "image/svg+xml",
    "image/tiff",
    "image/vnd.djvu",
    "image/x-xcf",
    "message/http",
    "message/imdn+xml",
    "message/partial",
    "message/rfc822",
    "model/iges",
    "model/mesh",
    "model/vrml",
    "model/x3d+binary",
    "model/x3d+fastinfoset",
    "model/x3d-vrml",
    "model/x3d+xml",
    "multipart/mixed",
    "multipart/alternative",
    "multipart/related",
    "multipart/form-data",
    "multipart/signed",
    "multipart/encrypted",
    "text/cmd",
    "text/css",
    "text/csv",
    "text/html",
    "text/markdown",
    "text/javascript",
    "text/plain",
    "text/rtf",
    "text/vcard",
    "text/vnd.a",
    "text/vnd.abc",
    "text/xml",
    "text/x-gwt-rpc",
    "text/x-jquery-tmpl",
    "video/avi",
    "video/mpeg",
    "video/mp4",
    "video/ogg",
    "video/quicktime",
    "video/webm",
    "video/x-matroska",
    "video/x-ms-wmv",
    "video/x-flv"
]
