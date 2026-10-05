class ListNodeStudy<T> {
    constructor(
        public value: T,
        public next: ListNodeStudy<T> | null = null
    ) {}
}

const first = new ListNodeStudy(10);
const second = new ListNodeStudy(20);
const third = new ListNodeStudy(30);

first.next = second;
second.next = third;

let current = first;

while (current.next !== null) {
    console.log(current.value);
    current = current.next;
} 


// Comentário: Bom pra inserir elementos em posições uniformes sem deslocar tudo? Tipo um algorítmo que define uma fila de prioridade de forma complexa, baseada em vários pesos diferentes nos elementos.