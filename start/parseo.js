const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const filePath = path.join(__dirname, 'localidades.json');

// Leer el archivo JSON de forma asíncrona
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }
 // Parsear el contenido del archivo
const localidades = JSON.parse(data);

// Crear un nuevo array para las localidades limpias
const localidadesLimpas = localidades.localidades.map(localidad => ({
  municipio: {
    nombre: localidad.municipio.nombre,
    id: localidad.municipio.id
  },
  departamento: {
    nombre: localidad.departamento.nombre,
    id: localidad.departamento.id
  },
  nombre: localidad.nombre,
  provincia: {
    nombre: localidad.provincia.nombre,
    id: localidad.provincia.id
  }
}));

// Acceder a los datos limpios, por ejemplo, imprimir todas las localidades limpias
console.log(localidadesLimpas);
});