// Calculadora de cuotas mensuales de creditos no mayores a $5000.
const formulario = document.querySelector('#formulario');
const nombreUsuario = document.querySelector('#nombres');
const apellidoUsuario = document.querySelector('#apellidos');
const correoUsuario = document.querySelector('#correo');
const identificacionUsuario = document.querySelector('#DNI');
const calculadora = document.querySelector('#calculadora');
const montoUsuario = document.querySelector('#monto');
const aniosUsuario = document.querySelector('#anios');
const periodoUsuario = document.querySelector('#periodo');

// Al enviar el formulario, almacenar datos y enviarlos mediante fetch
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Almacenar datos del usuario
    const datosUsuario = {
        nombre: nombreUsuario.value.trim(),
        apellidos: apellidoUsuario.value.trim(),
        email: correoUsuario.value.trim(),
        dni: identificacionUsuario.value.trim()
    };

    // Validar los campos antes de enviarlos
    if (!datosUsuario.nombre || !datosUsuario.apellidos || !datosUsuario.email || !datosUsuario.dni) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Todos los campos son obligatorios.",
        });
        return;
    }

    // Enviar los datos al servidor mediante fetch
    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        // Mostrar la calculadora y ocultar el formulario solo si los datos se envían correctamente
        console.log('Datos guardados en el servidor:', data);
        calculadora.style.display = 'block';   // Mostrar la calculadora
        formulario.style.display = 'none';     // Ocultar el formulario
    })
    .catch(error => {
        console.error('Error al enviar datos:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo enviar la información",
        });
    });
});

// Función para asignar la tasa de interés anual
function asignarTasaAnual(monto) {
    if (monto >= 100 && monto <= 1500) {
        return 0.045 / 12;
    } else if (monto > 1500 && monto <= 3000) {
        return 0.035 / 12;
    } else if (monto > 3000 && monto <= 5000) {
        return 0.025 / 12;
    } else {
        Swal.fire({
            icon: "error",
            title: "Monto fuera de rango",
            text: "El monto no puede exceder los $5000",
        });
        return null;
    }
}

// Función para determinar la frecuencia de pagos
function frecuencia(periodo) {
    switch (periodo) {
        case "mensual":
            return 12;
        case "bimestral":
            return 6;
        case "trimestral":
            return 4;
        case "semestral":
            return 2;
        default:
            return 1; // El periodo por defecto es anual
    }
}

// Clase Credito
class Credito {
    constructor(monto, plazo) {
        this.monto = monto;
        this.plazo = plazo;
    }

    cuotaPagar() {
        const tasa = asignarTasaAnual(this.monto);
        if (tasa) {
            return (this.monto * tasa * Math.pow(1 + tasa, this.plazo)) / (Math.pow(1 + tasa, this.plazo) - 1);
        } else {
            return 0;
        }
    }

    montoTotalApagar() {
        return this.cuotaPagar() * this.plazo;
    }
}

// Función asincrónica para enviar los datos del préstamo
async function enviarDatosPrestamo(prestamoDatos) {
    try {
        const response = await fetch('http://localhost:3000/prestamos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prestamoDatos)
        });

        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        
        const data = await response.json();
        document.getElementById('monto-final').innerHTML = "$" + data.cuota;
        document.getElementById('descripcion-calculo').innerHTML = `Monto: $${data.monto}, Plazo: ${data.plazo}`;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Error: ${error.message}`,
        });
    }
}

// Al enviar el formulario de la calculadora
calculadora.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const monto = parseFloat(montoUsuario.value.trim());
    const anios = parseInt(aniosUsuario.value.trim());
    const periodo = periodoUsuario.value.trim();

    // Validar entrada de datos
    if (isNaN(monto) || monto <= 0 || anios <= 0 || !periodo) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, ingrese valores válidos",
            footer: '<a href="#">Completa todos los datos!</a>'
        });
        return;
    }

    const plazo = anios * frecuencia(periodo);
    const prestamo = new Credito(monto, plazo);

    if (prestamo.cuotaPagar() !== 0) {
        const prestamoDatos = {
            monto: monto,
            plazo: plazo,
            cuota: Math.round(prestamo.cuotaPagar())
        };

        // Enviar los datos del préstamo al servidor
        enviarDatosPrestamo(prestamoDatos);
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal, no se pudo calcular la cuota",
            footer: '<a href="#">No se calculó la cuota</a>'
        });
    }
});

// Mostrar la fecha actual en el footer
const hoy = new Date();
document.getElementById('footer').innerHTML = hoy.toDateString();





