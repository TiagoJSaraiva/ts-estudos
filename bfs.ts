(() => { 

class Queue<T> {
    private tail: number = 0;
    private head: number = 0;
    private queue = new Map<number, T>();

    public isEmpty(): boolean {
        return this.head === this.tail;
    }

    public enqueue(value: T): void {
        this.queue.set(this.tail, value);
        this.tail++;
    }

    public dequeue(): T | undefined {
        if(this.isEmpty()) return undefined; // Aqui é pra manter o mesmo comportamento de array quando se tenta remover um elemento de uma estrutura sem elementos, mas poderia ter um erro emitido ou coisa do tipo.

        const removed = this.queue.get(this.head);

        this.queue.delete(this.head);
        this.head++;

        return removed;
    }

    public peek(): T | undefined {
        return this.queue.get(this.head);
    }

    public size(): number {
        return this.tail - this.head;
    }
}

function bfs(
    graph: Map<string, string[]>,
    start: string
): void {
    const visited = new Set<string>();
    const queue = new Queue<string>();

    queue.enqueue(start);
    visited.add(start);

    while (!queue.isEmpty()) {
        const node = queue.dequeue()!;

        console.log(node);

        for (const neighbor of graph.get(node) ?? []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.enqueue(neighbor);
            }
        }
    }
}

const queue = new Queue<string>();
queue.enqueue("ola");
queue.enqueue("tudo");
queue.enqueue("bem?");
queue.enqueue("com você");

console.log(queue.peek());
console.log(queue.dequeue());

console.log(queue.peek());

console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());

console.log(queue.peek());
console.log(queue.dequeue());
queue.enqueue("Estou péssimo");
console.log(queue.peek());
console.log(queue.dequeue());

})();