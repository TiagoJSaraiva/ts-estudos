const pegaRaiz = (n) => Math.trunc(Math.pow(n, 0.5));
const verificaDeFato = (raiz, n, i) => { 
    if(n%i === 0) { return false }
    else if(i <= raiz) { return verificaDeFato(raiz, n, i+1) }
    else { return true }};
const verificaPrimo = (n) => {
    switch(n) {
        case 2: return true;
        case 1: return false;
        default: return verificaDeFato(pegaRaiz(n), n, 2);
    }
}
console.assert(verificaPrimo(10007) === true, "1 - falhou");
console.assert(verificaPrimo(50003) === false, "2 - falhou");
console.assert(verificaPrimo(2) === true, "3 - falhou");
console.assert(verificaPrimo(1) === false, "4 - falhou");