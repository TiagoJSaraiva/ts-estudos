

function firstUniqueCharacter( text: string ): string | null  {
    const letters = new Map<string, number>();

    for(let i = 0; i < text.length; i++) {
        if( letters.get(text[i]) !== undefined ) {
            letters.set(text[i], -1);
            continue;
        }
        letters.set(text[i], i);
    }

    function getKeyByValue(): string | null {
        for (const [key, value] of letters.entries()) {
            if (value >= 0) {
                return key; 
            }
        }
        return null; 
    }

    // Time: O(n)
    // Space: O(n)

    return getKeyByValue();

    /*
        Oque eu tenho que fazer:
        - armazenar caractere e ordem de chegada
        - determinar forma de "marcar" caracteres que se repitiram
        
        Provavelmente uma priority qeue usando minheap.
        Os primeiro a chegar ficam "em cima" na qeue. Quando um dos elementos aparece 2 ou mais vezes, ele "desce" na qeue.

        Talvez dê também pra fazer usando Map;
    */
}

console.log(
    firstUniqueCharacter("aabbccddddde"),
    firstUniqueCharacter("aabbdde"),
    firstUniqueCharacter("aabbccdd"),
    firstUniqueCharacter("abcd"),
    firstUniqueCharacter("")
);