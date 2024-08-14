// Calculadora de cuotas mensuales de creditos no mayores a $5000.


class Credito{
    constructor(nombre, monto, plazo){
        this.nombre = nombre;
        this.monto = monto;
        this.plazo = plazo;
    }

    cuotaPagar(){
        const tasa = asignarTasaAnual(this.monto);
        if (tasa) {
            return (this.monto * tasa * Math.pow(1 + tasa, this.plazo)) / (Math.pow(1 + tasa, this.plazo) - 1);
        } else {
            return 0;
        }
    };
    montoTotalApagar(){
        return this.cuotaPagar() * this.plazo;
    };
}


// En este apartado se le asignara la tasa correspondiente segun el monto ingresado:
function asignarTasaAnual(monto){
    if(monto >= 100 && monto <= 1500){
        return 0.045/12;
    } else if(monto >= 1500 && monto <= 3000){
            return 0.035/12;
    }else if(monto >= 3000 && monto <= 5000){
        return 0.025/12;
    } else{
        alert("Servicio interrunpido")
        return null;
    }
}




const plazo = (anios, periodo) => anios * frecuencia(periodo);


// Aqui se evaluara el plazo que indique el usuario.
function frecuencia(periodo){
    if(periodo == "mensual"){
        return 12;
    }else if(periodo == "bimestral"){
        return 6;
    }else if(periodo == "trimestral"){
        return 4;
    }else if(periodo == "semestral"){
        return 2;
    }else{
        return 1; // El periodo por defecto es anual
    }
}


// La cantidad de creditos simuladas se guardaran aqui: 
const arrayCreditos = []; 

let limiteCreditos = prompt("Colaca la cantidad de creditos que deseas simular(maximo 10 simulaciones): ")

for (let i = 0; i < limiteCreditos && i <= 10; i++){
    const nombre = prompt("Ingrese su nombre: ");
    const monto = parseFloat(prompt("Ingrese el monto de su prestamo(minimo $100 y maximo $5000: "));
    const anios = parseFloat(prompt("Ingrese la cantidad de años: "));
    const periodo = prompt("Ingrese el periodo de pago preferido(mensual, bimestral, trimestral o semestral): ");

    const prestamo = new Credito(nombre, monto, plazo(anios, periodo));

    if(prestamo.cuotaPagar() !== 0) {
        arrayCreditos.push(prestamo);
    }else{
        alert("Simluacion interrunpida")
    }
}

const hoy = new Date();
console.log(hoy.toDateString());

arrayCreditos.forEach((credito) => { 
    console.log("La cuota de " + credito.nombre + " a pagar es de: $"+ Math.round(credito.cuotaPagar()) + " mensuales")});





