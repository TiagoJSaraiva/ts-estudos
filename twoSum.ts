

function twoSum(numbers: number[], target: number): [number, number] | null {
    for(let i = 0; i < numbers.length; i++) {
        for(let j = 0; j < numbers.length; j++) {
            if(i !== j) {
                if(numbers[i] + numbers[j] === target) return [i, j];
            }
        }
    }

    // Espaço: O(1)
    // Tempo: O(n²) no pior caso. 
    // Essa seria a solução mais fácil, mas mais complexa.

    return null;
}

/*
    A solução O(n) envolveria hash map ou Set. Qualquer tipo de estrutura que possua um método de busca de valor O(1)
*/


function twoSumImproved(numbers: number[], target: number): [number, number] | null {
    const numbersMap = new Map<number, boolean>();

    for(let i = 0; i < numbers.length; i++) {
        if(numbersMap.has(numbers[i])) {
            numbersMap.set(numbers[i], true);
        } else {
            numbersMap.set(numbers[i], false);
        } // Decisão pra colocar "valor" como true quando o valor for repetido na lista de números, pois se for repetido, na hora de procurar a melhor soma, pode se analisar o numero atual + ele mesmo.
    }

    for(const [key, value] of numbersMap.entries()) {
        const objective = target - key;
        if(key === objective && value === false) continue;
        if (numbersMap.has(objective)) return [key, objective];
    }

    // Espaço: O(n)
    // Tempo: O(n)
    // Essa é a solução mais eficiente a quesito de tempo, mas de espaço é O(n) pois necessita da criação de um Map.

    return null;
}




//console.log(twoSum([1, 5, 6, 2, 7, 1, 2, 3, 5, 9], 10));
console.log(twoSumImproved([1, 5, 6, 2, 1, 7, 2, 3, 5, 9], 2));