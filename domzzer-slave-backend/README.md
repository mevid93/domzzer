
# domzzer-slave-backend

---

This is a REST API that provides an easy access to the potential vulnerabilities that have been identified with dommzer-slave-fuzzer.

Requirements:
* .NET 6.0
* SQL Server
* dotnet ef
---

### How to run

The following steps are required before running the API for the first time.
1. Set up SQL server database.
2. Update the database connection string inside the appsettings.json.
3. Create the database and run migrations by running the following command: ``` dotnet ef database update ```

To start the API, use the following command: ``` dotnet run ```

---

### API endpoints

* Authenticate
```
POST api/login
```

* Get all vulnerabilities
```
GET api/vulnerabilities
```

* Get a single vulnerability by id
```
GET api/vulnerabilities/{id}
```

* Create a new vulnerability
```
POST api/vulnerabilities
```

The body must be a json with the following structure: ``` {"TargetBrowser":"Target Browser Value", "Payload": "Payload Value"} ```

* Delete vulnerability by id
```
DELETE api/vulnerabilities/{id}
```
