// Calculadora de cuotas mensuales de creditos no mayores a s/5000.
let monto = parseFloat(prompt("Introdusca su monto(Recordar que no debe ser mayor a s/5000): "));
let plazo = parseFloat(prompt("Introdusca la cantidad de meses en las que desea pagar(Maximo 18 meses): "));




function ingresarMonto(monto){
    if(monto == " "){
        console.error("No ah introducido nada aun, intente nuevamente")
    }else if(monto == 0){
        console.log("Ingrese un monto mayor a 0")
    }else if((monto > 0)&&(monto <= 5000)){
        console.log("Su monto igresado es: " + monto)
    }else {
        console.log("Su monto ingresado es mayor al permitido")
    }
}


function plazoIngresado(plazo){
    if(plazo == " "){
        console.error("No ah introducido nada aun, intente nuevamente")
    }else if(plazo == 0){
        console.log("Este no es un plazo valido")
    }else if((plazo > 0)&&(plazo <= 18)){
        console.log("El plazo ingresado es de: " + plazo + " Meses")
    }else {
        console.log("El plazo ingresado es superior al permitido")
    }
}



ingresarMonto(monto);
plazoIngresado(plazo);


for (let i = 2.5; i <= 4.5; i++){

    if(i != 2.5){
        continue;
    }
    console.log("Taza disponible: " + i)

}

for (let i = 2.5; i <= 4.5; i++){

    if(i != 3.5){
        continue;
    }
    console.log("Taza disponible: " + i)

}

for (let i = 2.5; i <= 4.5; i++){

    if(i != 4.5){
        continue;
    }
    console.log("Taza disponible: " + i)

}

let tasaAnual = prompt("Escoge tu taza: (Recordar los tipos de taza para cada monto: montos iguales o menores a s/1500 es 4.5% anual/para montos mayores a s/1500 y menores o iguales a s/3000 es 3.5% anual/ para montos mayores a s/3000 y maximo s/5000 es 2.5% anual")

switch(tasaAnual){
    case 4.5:
        console.log("La tasa correspondiente a su monto es 4.5%");
    case 3.5:
        console.log("La tasa correspondiente a su monto es 3.5%");
    case 2.5:
        console.log("La tasa correspondiente a su monto es 2.5%");
}


const tasaMensual = (tasaAnual / 100) / 12;

const calcularCuota = (a, b, c) => (a * b) / (1 - Math.pow((1 + b), -c))

console.log("Su cuota a pagar mensual es de: " + calcularCuota(monto, tasaMensual, plazo))

let cuotaPagar = calcularCuota(monto, tasaMensual, plazo);

const totalInteres = (a, b, c) => ((c * b) - a);

console.log("El interes total a pagar es de: " + totalInteres(monto, plazo, cuotaPagar))
