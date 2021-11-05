
# domzzer-slave-backend

---

This service provides REST API that provides easy access to the potential vulnerabilities that have been identified with dommzer-slave-fuzzer.

Requirements:
* .NET 5.0
* PostgreSQL database
---

### How to use

The following steps are required before running the API for the first time.
1. Set up PostgreSQL database.
2. Update the database connection string inside the appsettings.json.
3. Create the database with tables by running the following command: ``` dotnet ef database update ```

To start the API, use the following command: ``` dotnet run ```

---

### API endpoints

* Get all vulnerabilities
```
GET api/vulnerabilities
```

* Get a single vulnerability by Id
```
GET api/vulnerabilities/{id}
```

* Create a new vulnerability
```
POST api/vulnerabilities
```

The body must contain json with the following structure: ``` {"TargetBrowser":"Target Broswer Value", "Payload": "Payload Value"} ```

* Delete vulnerability by Id
```
DELETE api/vulnerabilities/{id}
```
