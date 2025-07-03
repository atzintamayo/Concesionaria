import * as express from 'express';
import * as pgPromise from 'pg-promise';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

dotenv.config();

const pgp = pgPromise();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL no está definida en el archivo .env');
}

const db = pgp(databaseUrl);

const app = express();
const port = 3001;

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Vehiculos
//********************************************************************************************************************

// Obtener todos los vehículos
app.get('/api/vehiculos', async (req, res) => {
  try {
    const vehiculos = await db.any(`
      SELECT 
          cat_marca.nombre AS marca,
          vehiculo.submarca,
          vehiculo.modelo, 
          cat_combustible.nombre AS combustible,
          cat_transmision.nombre AS transmision, 
          vehiculo.numpuertas,
          vehiculo.numejes, 
          cat_tipovehiculo.nombre AS tipovehiculo,
          estacionamiento.estacionamiento, 
          edificio.nombre AS ubicacion,
          vehiculo.num_placa,
          vehiculo.color,
          vehiculo.kilometraje,
          vehiculo.vin
      FROM vehiculo
      JOIN cat_marca ON vehiculo.fk_marca = cat_marca.id_marca
      JOIN cat_combustible ON vehiculo.fk_combustible = cat_combustible.id_combustible
      JOIN cat_transmision ON vehiculo.fk_transmision = cat_transmision.id_transmision
      JOIN cat_tipovehiculo ON vehiculo.fk_tipovehiculo = cat_tipovehiculo.id_tipovehiculo
      JOIN estacionamiento ON vehiculo.fk_estacionamiento = estacionamiento.id_estacionamiento
      JOIN edificio ON estacionamiento.fk_edificio = edificio.id_edificio
    `);
    res.json(vehiculos);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('hubo un error... ' + err.message);
  }
});

app.post('/api/vehiculos/insert', async (req, res) => {
  const {
    vin,
    fk_marca,
    submarca,
    modelo,
    fk_combustible,
    fk_transmision,
    numpuertas,
    numejes,
    fk_tipovehiculo,
    fk_estacionamiento,
    num_placa,
    color,
    kilometraje,
    seccion,
    numero
  } = req.body;

  try {
    await db.none(`
      INSERT INTO vehiculo (
        vin, fk_marca, submarca, modelo,
        fk_combustible, fk_transmision, numpuertas, numejes,
        fk_tipovehiculo, fk_estacionamiento, num_placa,
        color, kilometraje, seccion, numero
      )
      VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9, $10, $11,
        $12, $13, $14, $15
      )
    `, [
      vin,
      fk_marca,
      submarca,
      modelo,
      fk_combustible,
      fk_transmision,
      numpuertas,
      numejes,
      fk_tipovehiculo,
      fk_estacionamiento,
      num_placa,
      color,
      kilometraje,
      seccion,
      numero
    ]);

    res.status(201).json({ mensaje: 'Vehículo insertado correctamente' });
  } catch (err: any) {
    console.error(' Error al insertar vehículo:', err);
    // devuelve el mensaje y el stack para que veas la violación exacta
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
});



// Modificar vehículos
app.put('/api/vehiculos/:vin', async (req, res) => {
  const { vin } = req.params;
  const {
    fk_marca,
    submarca,
    modelo,
    fk_combustible,
    fk_transmision,
    numpuertas,
    numejes,
    fk_tipovehiculo,
    fk_estacionamiento,
    num_placa,
    color,
    kilometraje,
    seccion,
    numero
  } = req.body;

  try {
    // Ejecuta el UPDATE 
    const result = await db.result(
      `UPDATE vehiculo SET
         fk_marca         = $2,
         submarca         = $3,
         modelo           = $4,
         fk_combustible   = $5,
         fk_transmision   = $6,
         numpuertas       = $7,
         numejes          = $8,
         fk_tipovehiculo  = $9,
         fk_estacionamiento = $10,
         num_placa        = $11,
         color            = $12,
         kilometraje      = $13,
         seccion          = $14,
         numero           = $15
       WHERE vin = $1`,
      [
        vin,
        fk_marca,
        submarca,
        modelo,
        fk_combustible,
        fk_transmision,
        numpuertas,
        numejes,
        fk_tipovehiculo,
        fk_estacionamiento,
        num_placa,
        color,
        kilometraje,
        seccion,
        numero
      ],
      r => r.rowCount
    );

    if (result === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    res.json({ mensaje: 'Vehículo actualizado correctamente' });
  } catch (err: any) {
    console.error('Error al actualizar vehículo:', err);
    res.status(500).json({ error: err.message });
  }
});

// Eliminar vehículos

app.post('/api/vehiculos/delete', async (req, res) => {
  console.log('→ VIN param:', req.params.vin);
  
  const { vin } = req.body;  // vin viene en la URL

  try {
    // Ejecutamos el DELETE y obtenemos cuántas filas afectó
    const result = await db.result(
      'DELETE FROM vehiculo WHERE vin = $1',
      [vin],
      (r) => r.rowCount
    );

    if (result === 0) {
      // Si no borró nada, no existía ese VIN
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    res.json({ mensaje: 'Vehículo eliminado correctamente' });
  } catch (err: any) {
    console.error('Error al eliminar vehículo:', err);
    res.status(500).json({ error: err.message });
  }
});

// Patios
//********************************************************************************************************************

app.get('/api/edificios', async (req, res) => {
  try {
    const edificios = await db.any('SELECT * FROM edificio ORDER BY id_edificio');
    res.json(edificios);
  } catch (error) {
    console.error('Error al leer edificios:', error);
    res.status(500).json({ message: 'Error interno al obtener edificios' });
  }
});

// Insertar patios (pendiente de implementación)
app.post('/api/patios/insert', async (req, res) => {
  try {
    // Implementación pendiente según estructura de datos
    res.status(501).json({ message: 'Implementación pendiente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Hubo un error... ' + err.message);
  }
});

// Modificar patios (pendiente de implementación)
app.put('/api/patios/update/:id', async (req, res) => {
  try {
    // Implementación pendiente según estructura de datos
    res.status(501).json({ message: 'Implementación pendiente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Hubo un error... ' + err.message);
  }
});

// Eliminar patios (pendiente de implementación)
app.delete('/api/patios/delete/:id', async (req, res) => {
  try {
    // Implementación pendiente según estructura de datos
    res.status(501).json({ message: 'Implementación pendiente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Hubo un error... ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Backend corriendo en http://localhost:${port}`);
});
