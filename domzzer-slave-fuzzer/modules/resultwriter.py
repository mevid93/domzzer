import os

class ResultWriter:

    def __init__(self):
        pass

    def save_document(self, document_name, document_content):
        """Save document into /results/documents folder.

        Takes a generated html document and saves it into /results/documents folder.
        If document with a given document name already exists, it will be overwritten.

        Args:
            document_name (str): name of a the document to be saved (without filetype extension)
            document_content (std): content of the html file to be saved
        """
        # get current directory
        cwd = os.getcwd()

        # create results directory if it does not exist yet
        results_dir_exists = False
        for subdir in os.listdir(cwd):
            if (subdir == "results" and os.path.isdir(os.path.join(cwd, subdir))):
                results_dir_exists = True
        
        if not results_dir_exists:
            os.mkdir(os.path.join(cwd, "results"))
        
        # create documents folder inside the results directory if it does not exist yet
        documents_dir_exists = False
        results_dir = os.path.join(cwd, "results")
        for subdir in os.listdir(results_dir):
            if (subdir == "documents" and os.path.isdir(os.path.join(results_dir, subdir))):
                documents_dir_exists = True
        
        if not documents_dir_exists:
            os.mkdir(os.path.join(results_dir, "documents"))

        # write html documen inside the document folder
        documents_dir = os.path.join(results_dir, "documents")
        new_file_path = os.path.join(documents_dir, document_name + ".html")
        f = open(new_file_path, "w")
        f.write(document_content)
        f.close()

    def save_vulnerability(self):
        raise NotImplementedError() # save vulnerability into file or database or both
