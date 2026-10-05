function findIndex(numbers: number[], target: number): number | undefined {

    // Espaço: O(1)
    // Tempo: O(log n)... pensando bem tá mais pra um O(n/2), não sei, mas não consigo pensar em outra forma, talvez apenas "repartindo" o array em mais partes, por exemplo, pegando Math.floor((numbers.length)/3), pois de qualquer forma o algorítmo necessita obrigatóriamente de ler uma grande porção do array, visto que a progressão é imprevisível, apenas se sabe que é crescente, mas pode ser tanto [1, 2, 4, 6] quanto [1, 60, 2012220, Number.MAX_SAFE_INTEGER]

    const half = Math.floor((numbers.length)/2);

    function searchBehind(): number | undefined {
        for(let i = half; i >= 0; i-- ) {
            if (numbers[i] === target) {
                return i;
            }
        }
        // O(n);
        return -1;
    }

    function searchFoward(): number | undefined  {
        for(let i = half; i < numbers.length; i++ ) {
            if (numbers[i] === target) {
                return i;
            }
        }
        // O(n);
        return -1;
    }

    return numbers[half] >= target ? searchBehind() : searchFoward();
}

const numbers: number[] = [1, 3, 5, 7, 9, 12, 15, 19, 22, 26, 29, 35, 40, 45, 50, 51, 52, 53, 54, 65, 76, 87, 98];

console.log(findIndex(numbers, 11));

// Eu vi que, no exemplo, a tentativa de procura de um número que não existe no array retorna -1, como é o caso de findIndex(numbers, 40); com suposta saída -1, e supondo que é um comportamento esperado, inclui "return -1" nas funções caso o valor não seja encontrado no array, caso contrário elas retornariam "undefined".