function toDecimal(binary: number) {
    return parseInt(String(binary), 2);
}

function toBinary(decimal: number) {
    return Number(decimal.toString(2));
}

let numero = 0;

for(let i = 0; i < 10; i++)  {
    console.log(numero);
    numero = toBinary(toDecimal(numero)+1);
}