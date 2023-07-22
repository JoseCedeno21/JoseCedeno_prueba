# José Cedeño Prueba

Prueba desarrollada con Nodejs, Typescript y Sequelize como ORM

## Carpeta /src

Contiene el Código principal del proyecto

### Rutas disponibles

#### Metricas

```sh
GET '/verificationCode' -> Servicio para obtener los codigos de verificación
GET '/:id' -> Servicio para obtener las metricas de repositorio por id, como query para filtrar se puede enviar date, state, coverage
GET '/download/:id' -> Servicio para descargar el archivo csv por id
```

#### Organización

```sh
GET '/:id' -> Servicio para obtener una organizacion por id
POST '/' -> Servicio para crear una nueva organizacion enviando un json con name y state
PUT '/:id' -> Servicio para editar una organizacion por id enviando un json con los datos a actualizar (name, state)
DELETE '/:id' -> Servicio para eliminar una organizacion por id
```

## Ejecutar el proyecto

```sh
1. Clonar el repositorio
2. Ejecutar npm install
3. Para iniciar el servicio ejecutar ts-node app.ts o npm start
4. Para iniciar las pruebas ejecutar npm test tests/index.test.ts
```

## Carpeta /tests

Pruebas unitarias para el ejercicio 3 donde se prueban escenarios del endpoint de obtener metricas 
