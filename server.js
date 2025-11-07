const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para procesar JSON en el cuerpo de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parte 1: Servidor y rutas básicas

// GET /saludo → Retorna un saludo en formato JSON
app.get('/saludo', (req, res) => {
  res.status(200).json({
    mensaje: 'Hola, bienvenido al servidor Express',
    fecha: new Date().toISOString()
  });
});

// POST /usuario → Retorna un mensaje confirmando creación
app.post('/usuario', (req, res) => {
  const { nombre, email } = req.body;
  
  // Validación: si no tiene nombre, devolver error 400
  if (!nombre) {
    return res.status(400).json({
      error: 'El nombre es requerido',
      codigo: 400
    });
  }
  
  res.status(201).json({
    mensaje: 'Usuario creado exitosamente',
    usuario: {
      nombre: nombre,
      email: email || 'No proporcionado'
    }
  });
});

// PUT /usuario/:id → Retorna un mensaje de actualización con el id
app.put('/usuario/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  
  // Simulación: si el id no existe, devolver 404
  if (id === '0' || id === 'inexistente') {
    return res.status(404).json({
      error: 'Usuario no encontrado',
      id: id,
      codigo: 404
    });
  }
  
  res.status(200).json({
    mensaje: 'Usuario actualizado exitosamente',
    id: id,
    datos: {
      nombre: nombre || 'No actualizado',
      email: email || 'No actualizado'
    }
  });
});

// DELETE /usuario/:id → Retorna un mensaje de eliminación con el id
app.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;
  
  // Simulación: si el id no existe, devolver 404
  if (id === '0' || id === 'inexistente') {
    return res.status(404).json({
      error: 'Usuario no encontrado para eliminar',
      id: id,
      codigo: 404
    });
  }
  
  res.status(200).json({
    mensaje: 'Usuario eliminado exitosamente',
    id: id
  });
});

// Parte 2: Parámetros y JSON

// Ruta que recibe parámetros por URL (req.params)
app.get('/producto/:categoria/:id', (req, res) => {
  const { categoria, id } = req.params;
  
  res.status(200).json({
    mensaje: 'Parámetros recibidos por URL',
    parametros: {
      categoria: categoria,
      id: id
    },
    tipo: 'req.params'
  });
});

// Ruta que recibe parámetros por query string (req.query)
app.get('/busqueda', (req, res) => {
  const { termino, pagina, limite } = req.query;
  
  res.status(200).json({
    mensaje: 'Parámetros recibidos por query string',
    parametros: {
      termino: termino || 'No proporcionado',
      pagina: pagina || 'No proporcionado',
      limite: limite || 'No proporcionado'
    },
    tipo: 'req.query'
  });
});

// Ruta POST que procesa parámetros en el cuerpo de la petición
app.post('/datos', (req, res) => {
  const datos = req.body;
  
  // Validación: si el cuerpo está vacío
  if (!datos || Object.keys(datos).length === 0) {
    return res.status(400).json({
      error: 'El cuerpo de la petición está vacío',
      codigo: 400
    });
  }
  
  res.status(200).json({
    mensaje: 'Datos recibidos en el cuerpo de la petición',
    datos: datos,
    tipo: 'req.body'
  });
});

// Parte 3: Códigos de respuesta y validaciones

// Ejemplo de validación con código 400
app.post('/validar', (req, res) => {
  const { nombre, edad } = req.body;
  
  if (!nombre) {
    return res.status(400).json({
      error: 'El nombre es requerido',
      codigo: 400
    });
  }
  
  if (!edad || edad < 0) {
    return res.status(400).json({
      error: 'La edad debe ser un número positivo',
      codigo: 400
    });
  }
  
  res.status(200).json({
    mensaje: 'Validación exitosa',
    datos: {
      nombre: nombre,
      edad: edad
    }
  });
});

// Ejemplo de error 500 simulado
app.get('/error-servidor', (req, res) => {
  // Simulación de error del servidor
  res.status(500).json({
    error: 'Error interno del servidor',
    mensaje: 'Ha ocurrido un error inesperado',
    codigo: 500
  });
});

// Ruta 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta: req.originalUrl,
    metodo: req.method,
    codigo: 404
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});

