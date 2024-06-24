const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const filePath = path.join(__dirname, 'localidades.json');

// Leer el archivo de forma asíncrona
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }
  // Parsear el contenido del archivo
  const localidades = JSON.parse(data);

  // Extraer los nombres únicos de las provincias
  const nombresProvincias = new Set(localidades.localidades.map(localidad => localidad.provincia.nombre));

  let csvContent = "Provincia,Localidad,Municipio,Departamento,Latitud,Longitud\n"; // Encabezados del CSV

  // Iterar sobre cada nombre de provincia y agrupar las localidades correspondientes
  nombresProvincias.forEach(nombreProvincia => {
    const localidadesPorProvincia = localidades.localidades.filter(localidad => localidad.provincia.nombre === nombreProvincia)
      .map(localidad => ({
        Localidad: localidad.nombre,
        municipio: localidad.municipio.nombre,
        departamento: localidad.departamento.nombre,
        lat: localidad.centroide.lat,
        lon: localidad.centroide.lon
      }));

    // Convertir las localidades de la provincia actual a formato CSV
    localidadesPorProvincia.forEach(localidad => {
      csvContent += `${nombreProvincia},${localidad.Localidad},${localidad.municipio},${localidad.departamento},${localidad.lat},${localidad.lon}\n`;
    });
  });

  // Ruta al archivo CSV de salida
  const outputPath = path.join(__dirname, 'localidades.csv');

  // Escribir el contenido en un archivo CSV
  fs.writeFile(outputPath, csvContent, 'utf8', (err) => {
    if (err) {
      console.error("Error al escribir el archivo CSV:", err);
      return;
    }
    console.log("Archivo CSV creado con éxito.");
  });
});