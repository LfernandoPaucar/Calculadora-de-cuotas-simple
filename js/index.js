// Calculadora de cuotas mensuales de creditos no mayores a $5000.
const formulario = document.querySelector('#formulario');
const nombreUsuario = document.querySelector('#nombres');
const apellidoUsuario = document.querySelector('#apellidos');
const correoUsuario = document.querySelector('#correo');
const identificacionUsuario = document.querySelector('#DNI');

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // Almacenar datos del usuario en localStorage
    const nameStorage = nombreUsuario.value.trim();
    const lastnameStorage = apellidoUsuario.value.trim();
    const emailStorage = correoUsuario.value.trim();
    const dniStorage = identificacionUsuario.value.trim();

    localStorage.setItem("Nombre", nameStorage);
    localStorage.setItem("Apellidos", lastnameStorage);
    localStorage.setItem("Email", emailStorage);
    localStorage.setItem("Dni", dniStorage);

    // Mostrar la calculadora y ocultar el formulario
    calculadora.style.display = 'flex';
    formulario.style.display = 'none';
});

let montoUsuario = document.querySelector('#monto');
let aniosUsuario = document.querySelector('#anios');
let periodoUsuario = document.querySelector('#periodo');

// Función para asignar la tasa de interés anual
function asignarTasaAnual(monto) {
    if (monto >= 100 && monto <= 1500) {
        return 0.045 / 12;
    } else if (monto > 1500 && monto <= 3000) {
        return 0.035 / 12;
    } else if (monto > 3000 && monto <= 5000) {
        return 0.025 / 12;
    } else {
        alert("Servicio interrumpido");
        return null;
    }
}

// Función para determinar la frecuencia de pagos
function frecuencia(periodo) {
    if (periodo === "mensual") {
        return 12;
    } else if (periodo === "bimestral") {
        return 6;
    } else if (periodo === "trimestral") {
        return 4;
    } else if (periodo === "semestral") {
        return 2;
    } else {
        return 1; // El periodo por defecto es anual
    }
}

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

const arrayCreditos = [];

calculadora.addEventListener("submit", (e) => {
    e.preventDefault();

    const monto = parseFloat(montoUsuario.value.trim());
    const anios = parseInt(aniosUsuario.value.trim());
    const periodo = periodoUsuario.value.trim();

    if (!monto || !anios || !periodo) {
        alert("Por favor, completa todos los campos antes de continuar.");
        return;
    }

    const plazo = anios * frecuencia(periodo);

    const prestamo = new Credito(monto, plazo);
    // const creditoJSON = JSON.stringify(prestamo);
    if (prestamo.cuotaPagar() !== 0) {
        // Convertir el objeto `prestamo` a JSON
        localStorage.setItem("Prestamo", JSON.stringify(prestamo));
        const creditoJSON = JSON.stringify(Math.round(prestamo.cuotaPagar()));
        // Almacenar el JSON en `localStorage`
        localStorage.setItem("Credito", creditoJSON);
    } else {
        alert("Simulación interrumpida")};

    document.getElementById('monto-final').innerHTML = "$" + localStorage.getItem("Credito");
    document.getElementById('descripcion-calculo').innerHTML = "A partir de los siguientes datos: " + localStorage.getItem("Prestamo");
});

const hoy = new Date();
document.getElementById('footer').innerHTML = hoy.toDateString();

// arrayCreditos.forEach((credito) => { 
//     console.log("La cuota de " + credito.nombre + " a pagar es de: $"+ Math.round(credito.cuotaPagar()) + " mensuales")});

