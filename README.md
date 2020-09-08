# Make-magic
This project is a CRUD of Harry Potter characters with house validation with Make-Magic API.

**Installation**

In the root folder, run:
```shell
docker-compose up
```
The compose file runs the node application container and a mongodb container at ports 3000 and 27017. To access the swagger file with the routes, access:
```shell
http://<application_address>:3000/swagger
```


There are some other scripts that can be ran locally:
```shell
npm run test
```
to run some integration tests written using Chai and supertest frameworks   


```shell
npm run coverage
```  
to get some test coverage reports 


```shell
npm run lint
```  
to see if tslint show some warnings or errors by its rules.
  

