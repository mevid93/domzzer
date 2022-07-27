
# domzzer-slave-fuzzer

---

Document Object Model (DOM) fuzzer.

---

### How to use

* Show syntax of supported command line arguments
```console
foo@bar:~/.../domzzer-slave-fuzzer$ python3 dommzzer.py -h
usage: domzzer.py [-h] [--mode {fuzzer,generator}] [--save {db,file,dbfile}]

Document Object Model (DOM) fuzzer.

optional arguments:
  -h, --help            show this help message and exit
  --mode {fuzzer,generator}
                        program operation mode (default=fuzzer)
  --save {db,file,dbfile}
                        result storing method (default for fuzzer is db, generator mode only supports file)
```
