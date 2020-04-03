# API INFO

Esta es una API que te permite obtener y/o generar diferentes datos desde una base de datos hecha en **mongoDB** utilizando diversos endpoints.

---

## Estructura de datos

### Tenemos solamente dos estructuras de datos llamadas models, hechas con **mongoose**

### **User**

La Estructura principal de esa API, en esta almacenamos los siguientes datos.

    {
        name: String,
        email: String,
        password: string,
        votes: [{}],
        isAdmin: Boolean,
        areaVotePoints: [{}],
        tokens: [{}]
    }

#### **Propiedades**

* ***name***: contiene el nombre del usuario en formato String.
* ***email***: contiene el correo del usuario en formato String efectuando validaciones con una libreria llamada **validator**.
* ***password***: contiene la contraseña del usuario en formato String, la misma se encrypta utilizando **bcrypsJS**.
* ***votes***: contiene los votos que recibe el empleado, es un array de objetos con tres propiedades:

    {
        id: String,
        area: String,
        comment: String
    }

    **id**: del usuario que lo voto, **area**: en la que fue votado, **comment:** opcional.

* **isAdmin**: contiene un Boolean dependiendo si el usuario tiene privilegios de administrador o no.
* **areaVotePoints**: un Array del tipo String donde se guardan las areas en la que el usuario ya realizo la votacion.
* **tokens**: contiene un array de objetos que guardan los tokens generados en las sesiones.

#### **Area**

La segunda estructura que contiene la base de datos, es la mas sencilla y se utiliza unicamente para almecenar las "Areas" que existen en el sistema para realizar las votaciones.

    {
        name: String
    }

* **name**: es un objeto que tiene solo una propiedad llamada name, que almacena un dato del tipo String.

---

## Rutas de autentificación

### Rutas para manejar el registro y login de los usuarios

`/api/user/register` : Ruta que recibe una petición HTTP del tipo **POST** en formato **JSON** y crea un usuario.

`/api/user/login` : Ruta que recibe una petición HTTP del tipo **POST** en formato **JSON** y Logea al usuario entregandole un Token de autentificación utilizando **jsonwebtoken**.

---

## Rutas de administrador

### Estas rutas solo son accesibles cuando el usuario que realiza la peticion tiene permisos de administrador

`/api/users/mostvoted` : Ruta que recibe una petición HTTP del tipo **GET**, devolviendo en formato **JSON** un array de las personas mas votadas de mayor a menor.

`/api/users/cant` : Ruta que recibe una petición HTTP del tipo **GET**, devolviendo en formato **JSON** la cantidad de usuarios registrados, sin contar a los que tengan permisos de administrador.

---

## Routas de areas

### Rutas para manejar las areas que existen en el sistema de votacion

`/api/areas/read` : Ruta que recibe una petición HTTP del tipo **GET**, y devuelve un array con las areas que existen para realizar las votaciones.

### Para estas rutas se necesita permiso de administrador

`/api/areas/create` : Ruta que recibe una petición HTTP del tipo **POST** en formato **JSON** y crea un Area.

`/api/area/delete/:id` : Ruta que recibe una petición HTTP del tipo **DELETE** con un id como parametro y elimina el area correspondiente.

`/api/areas/deleteall` : Ruta que recibe una petición HTTP del tipo **DELETE** y elimina todas las areas de la base de datos.

---

## Rutas de usuario

### Rutas para manejar todos los accesos que tienen los usuarios incluyendo a los que tienen permisos de adminitrador, para eso se require estar autentificado

`/api/users` : Ruta que recibe una petición HTTP del tipo **GET**, y devuelve un array con los usuarios de la base de datos, sin incluir al que realiza la peticion ni a los que tengan permiso de administrador.

`/api/user/logout` : Ruta que recibe una petición HTTP del tipo **POST** y delogea al usuario autentificado eliminando el token actual de autentificación.

`/api/user/logoutall` : Ruta que recibe una petición HTTP del tipo **POST** y delogea al usuario autentificado eliminando todos los tokens.

`/api/user/vote` : Ruta que recibe una petición HTTP del tipo **POST** en formato **JSON** buscando por el ID la persona votada y agregandole a su array de votos el ID de la persona que lo votó, el area en el que fue votado y un comentario que puede ser opcional.

`/api/user/profile` : Ruta que recibe una petición HTTP del tipo **GET**, y devuelve los datos del usuario autentificado.
