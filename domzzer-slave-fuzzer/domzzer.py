import argparse
import dotenv
import os
import requests
import warnings

from modules.fuzzer import Fuzzer
from modules.generator import Generator


def parse_arguments():
    """Extract arguments and return them.

    Returns:
        argparse.Namespace: argument namespace holding command line parameters 
    """
    parser = argparse.ArgumentParser(
        description="Document Object Model (DOM) fuzzer.")
    parser.add_argument("--mode", default="fuzzer", choices=["fuzzer", "generator"],
                        help="program operation mode (default=fuzzer)")
    parser.add_argument("--save", default="db", choices=["db", "file", "dbfile"],
                        help="result storing method (default for fuzzer is db, generator mode only supports file)")
    args = parser.parse_args()

    # if generator mode, then set the storing method
    if args.mode == "generator":
        args.save = "file"
    return args


def load_environmental_variables(args):
    """Load environmental variables into dictionary.

    Args:
        args (argparse.Namespace): command line parameters

    Returns:
        envs (dict): dictionary containing environmental variables
    """
    dotenv.load_dotenv()
    envs = {}

    # if operation mode is generator, then no variables are needed
    if args.mode == "generator":
        return

    at_least_one_browser = False
    for i in range(5):
        try:
            path = os.getenv("BROWSER" + str(i+1) + "_PATH")
            name = os.getenv("BROWSER" + str(i+1) + "_NAME")
            if path != None and path != "" and name != None and name != "":
                envs["BROWSER" + str(i+1) + "_PATH"] = path
                envs["BROWSER" + str(i+1) + "_NAME"] = name
                at_least_one_browser = True
        except:
            pass

    if not at_least_one_browser:
        raise Exception("--mode fuzzer requires at least one browser!")

    # if operation mode is fuzzer and storage method is file, then we only need browser variables
    if args.mode == "fuzzer" and args.save == "file":
        return envs

    # otherwise we also need SlaveAPI configuration
    # when storing to database, we actually save the data by using SlaveAPI
    api_address = os.getenv("SLAVE_API_ADDRESS")
    api_username = os.getenv("SLAVE_API_USERNAME")
    api_password = os.getenv("SLAVE_API_PASSWORD")
    envs["SLAVE_API_ADDRESS"] = api_address
    envs["SLAVE_API_USERNAME"] = api_username
    envs["SLAVE_API_PASSWORD"] = api_password

    if api_address == None or api_address == "":
        raise Exception("--save db|dbfile requires api address!")
    if api_password == None:
        raise Exception("--save db|dbfile requires api username!")
    if api_username == None:
        raise Exception("--save db|dbfile requires api username!")

    # last step is to make sure that we can actually reach the api
    test_slave_api_connection(api_address, api_username, api_password)

    return envs


def test_slave_api_connection(address, username, password):
    """Test connection to SlaveAPI.

    Throws exception if connection to SlaveAPI fails.

    Args:
        address (str): address to the api
        username (str): api username
        password (str): api password
    """
    url = address
    if url[-1] == "/":
        url += "api/login"
    else:
        url += "/api/login"

    login_object = {"username": username, "password": password}
    try:
        response = requests.post(url, json=login_object, verify=False)
        if response.status_code == 200:
            print("ok")
            return
        raise Exception(
            "Connection to SlaveAPI failed! (status_code == " + str(response.status_code) + ")")
    except e:
        raise Exception("Connection to SlaveAPI failed!")


def main(args, envs):
    """Main function for fuzzer.

    Args:
        args (argparse.Namespace): command line parameters
        envs (dict): environmental variables
    """
    # print program logo
    print(" ______   _______  _______  _______  _______  _______  _______ ")
    print("(  __  \ (  ___  )(       )/ ___   )/ ___   )(  ____ \(  ____ )")
    print("| (  \  )| (   ) || () () |\/   )  |\/   )  || (    \/| (    )|")
    print("| |   ) || |   | || || || |    /   )    /   )| (__    | (____)|")
    print("| |   | || |   | || |(_)| |   /   /    /   / |  __)   |     __)")
    print("| |   ) || |   | || |   | |  /   /    /   /  | (      | (\ (   ")
    print("| (__/  )| (___) || )   ( | /   (_/\ /   (_/\| (____/\| ) \ \__")
    print("(______/ (_______)|/     \|(_______/(_______/(_______/|/   \__/")
    print("")

    # print execution information
    print("OPERATION MODE: " + args.mode)
    print("RESULT STORING METHOD: " + args.save)

    if args.mode == "fuzzer":
        for i in range(5):
            key_path = "BROWSER" + str(i+1) + "_PATH"
            key_name = "BROWSER" + str(i+1) + "_NAME"
            if key_path in envs and key_name in envs:
                print(key_path + ": " + envs["BROWSER" + str(i+1) + "_PATH"])
                print(key_name + ": " + envs["BROWSER" + str(i+1) + "_NAME"])

    if args.save in ["db", "dbfile"]:
        print("SLAVE_API_ADDRESS: " + envs["SLAVE_API_ADDRESS"])
        print("SLAVE_API_USERNAME: " + envs["SLAVE_API_USERNAME"])
        print("SLAVE_API_PASSWORD: " + "*" * len(envs["SLAVE_API_PASSWORD"]))

    # start fuzzing or document generation
    if args.mode == "fuzzer":
        fuzzer = Fuzzer(args, envs)
        fuzzer.run()
    elif args.mode == "generator":
        generator = Generator()
        generator.run()


# execute the main function if file is executed as main program
if __name__ == "__main__":
    warnings.simplefilter("ignore")
    args = parse_arguments()
    envs = load_environmental_variables(args)
    main(args, envs)
