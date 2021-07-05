import os

from dotenv import load_dotenv


class Config:
    """ Class for holding environmental variables.

    Class loads information from the .env-file and provides easy
    access to this data.

    Methods
    ----------
    get_server_username():
        Returns server username
    get_server_password(): 
        Returns server password 
    get_server_port(): 
        Returns server port
    get_browsers()
        Returns list of paths to browser executables
    """

    def __init__(self, dot_env_folder=None):
        """ Constructor fot Config object.

        Takes folder path as input parameter. This path should
        point to the folder where .env file is located. This is
        optional. The object will work also without the .env file,
        as long ass the environmental variables are defined.

        Parameters
        ----------
        dot_env_folder: str, optional
            Path to folder where .env file is located
        """
        if dot_env_folder != None:
            DOTENV_PATH = os.path.join(dot_env_folder, ".env")
            load_dotenv(DOTENV_PATH)
        self.__server_username = os.getenv("SERVER_USERNAME")
        self.__server_password = os.getenv("SERVER_PASSWORD")
        self.__server_port = os.getenv("SERVER_PORT")
        self.__browser_firefox = os.getenv("BROWSER_FIREFOX")
        self.__browser_chrome = os.getenv("BROWSER_CHROME")
        self.__browser_edge = os.getenv("BROWSER_EDGE")
        self.__browser_safari = os.getenv("BROWSER_SAFARI")
        self.__browser_midori = os.getenv("BROWSER_MIDORI")

    def get_server_username(self):
        """ Get server username.

        Method returns server username.

        Returns
        -------
        str: server username
        """
        return self.__server_username

    def get_server_password(self):
        """ Get server password.

        Method returns server password.

        Returns
        -------
        str: server password
        """
        return self.__server_password

    def get_server_port(self):
        """ Get server port.

        Method returns server port.

        Returns
        -------
        int: server port
        """
        return self.__server_port

    def get_browsers(self):
        """ Get list of available browsers.

        Method returns a list of paths to browser executables
        that are available for fuzzing.

        Returns
        -------
        list[str]: list of paths to web browsers
        """
        browsers = {}
        if self.__check_if_string_is_path_to_file(self.__browser_firefox):
            browsers["firefox"] = self.__browser_firefox.strip()
        if self.__check_if_string_is_path_to_file(self.__browser_chrome):
            browsers["chrome"] = self.__browser_chrome.strip()
        if self.__check_if_string_is_path_to_file(self.__browser_edge):
            browsers["edge"] = self.__browser_edge.strip()
        if self.__check_if_string_is_path_to_file(self.__browser_safari):
            browsers["safari"] = self.__browser_safari.strip()
        if self.__check_if_string_is_path_to_file(self.__browser_midori):
            browsers["midori"] = self.__browser_midori.strip()
        return browsers

    def __check_if_string_is_path_to_file(self, browser_str):
        if browser_str == None or not browser_str.strip():
            return False
        return os.path.isfile(browser_str.strip())
