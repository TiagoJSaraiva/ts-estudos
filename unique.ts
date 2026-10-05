
function unique<T>(value: T[]): T[] {
    if(value.length === 0) return [];

    const values = new Map<T, T>();

    for(const i of value) {
        values.set(i, i);
    }

    const finalArray: T[] =  [];

    for(const [key, value] of values.entries()) {
        finalArray.push(key);
    }

    return finalArray;

    //Time O(n)
    //Space O(n)

    // Aqui acho que consigo resolver com linked list ou Map. Map parece a solução mais simples. Considerando que não devo usar Set(), visto que foi demonstrado um exemplo de uso com ele, vou utilizar outro método.
}

const lista: number[] = [1, 1, 1, 1, 1, 1, 2, 3];

//console.log([...new Set(lista)])

console.log(unique(lista));