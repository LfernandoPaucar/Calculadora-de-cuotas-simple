const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete CORS
const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(bodyParser.json()); // Permite al servidor interpretar JSON en las solicitudes

// Ruta para manejar la creación de usuarios
app.post('/usuarios', (req, res) => {
    const { nombre, apellidos, email, dni } = req.body;
    // Aquí puedes almacenar el usuario en una base de datos o en un arreglo
    res.status(201).json({
        message: "Usuario creado correctamente",
        usuario: { nombre, apellidos, email, dni }
    });
});

// Ruta para manejar la creación de préstamos
app.post('/prestamos', (req, res) => {
    const { monto, plazo, cuota } = req.body;

    // Aquí puedes realizar los cálculos o almacenar los datos
    // Suponiendo que el cálculo es correcto
    res.status(201).json({
        monto: monto,
        plazo: plazo,
        cuota: cuota
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
