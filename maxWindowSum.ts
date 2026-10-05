import Queue from "./queue";

function maxWindowSum( numbers: number[], k: number ): number | undefined {
    if(k > numbers.length) return;
    if(k === 1 && numbers.length === 1) return numbers[0];

    const results: number[] = [];
    const addends = new Queue<number>();
    function sum(list: number[]): number {
        return list.reduce((acc, number) => {
            return acc + number;
        }, 0);
    }

    let i: number = 0;
    let j: number = 0;
    let lastRemoved: number;
    
    for(i; i < k; i++) {
        addends.enqueue(numbers[i]);
    }
    if(addends.isEmpty()) return;

    results.push(sum(addends.toArray())); // Método sum e toArray são O(n), só pode ser chamado fora de laço se não torna algorítmo em O(n²)

    while(true) {
        lastRemoved = addends.dequeue()!;

        if(numbers[i] === undefined) break;

        results.push(results[j] - lastRemoved + numbers[i]);
        addends.enqueue(numbers[i]);

        i++;
        j++;    
        // Métodos push e enqeue são O(1), então podem ser chamados sem problema;
    };
    
    console.log(`resultados das somas: ${results}`);
    results.sort((b, a) => a - b); // sort é O(n log n)
    return results[0];

    // A solução mais simples seria testar cada soma de grupos de valores de k indices, pegando i, i+1, i+2... até i+k, e refazer isso em várias iterações, guardando resultado das somas
    // Também dá pra usar Queue pra armazenar todos os valores que façam parte de cada intervalo de soma, e a cada iteração apenas remover a cabeça e adicionar o próximo indice a cauda, transformando a operação de O(n²) em O(n)
    // Provavelmente essa solução final possui vários pontos de otimização e simplificação, mas pelo menos está O(n)

    // Space O(n log n)
    // Time O(n)
}
console.log(
    maxWindowSum(
        [2, 1, 5, 1, 3, 2],
        3
    )
);