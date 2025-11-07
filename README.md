# Servidor Express REST

Soy Magdalena Inalaf y este es un servidor REST básico construido con Express.js. Este proyecto fue parte de una actividad para entender y experimentar con diferentes tipos de peticiones HTTP, parámetros y códigos de respuesta.

## Información de contacto

- Nombre: Magdalena Inalaf
- GitHub: https://github.com/MagdaIG
- LinkedIn: https://www.linkedin.com/in/minalaf/
- Página web: https://inalaf.ca/
- Email: magda.inalaf@gmail.com

## Cómo ejecutarlo

Primero necesitas tener Node.js instalado. Luego:

```
npm install
npm start
```

El servidor correrá en http://localhost:3000

## Rutas disponibles

### Rutas básicas
- GET /saludo
- POST /usuario (requiere nombre en el body)
- PUT /usuario/:id
- DELETE /usuario/:id

### Parámetros
- GET /producto/:categoria/:id (parámetros en URL)
- GET /busqueda?termino=valor (query string)
- POST /datos (parámetros en el body)

### Validaciones
- POST /validar
- GET /error-servidor (simula error 500)

## Por qué hice las pruebas

Probé todas las rutas del servidor usando curl para asegurarme de que todo funciona correctamente antes de entregar el proyecto. Verifiqué que:

- Las rutas GET responden correctamente con código 200
- Las rutas POST crean recursos y devuelven 201, o 400 si falta información
- Las rutas PUT y DELETE funcionan y devuelven 404 cuando el recurso no existe
- Los parámetros por URL, query string y body se procesan correctamente
- Las validaciones devuelven los códigos de error apropiados (400, 404, 500)
- La ruta 404 personalizada funciona para rutas no definidas

Usé express.json() en lugar de body-parser porque viene integrado en Express y es más simple. Organizé el código en tres partes según las instrucciones de la actividad para que sea más fácil de seguir.
