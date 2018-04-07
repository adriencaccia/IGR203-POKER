# IGR203-POKER

Project for IGR203 by:
* Cacciaguerra Adrien
* Edwards Philippe
* Le Page Henri


# Running the app

This project uses its own styled map tiles served by a docker container.

With docker installed, go to **/tiles** and run :

```
docker run --rm -it -v $(pwd):/data -p 8080:80 klokantech/openmaptiles-server
```
In a new terminal, go to **/poker** and run :

```
npm install
node .
```
Finaly, in a new terminal, go to **/poker/client_src** and run :

```
npm install
npm start
```
