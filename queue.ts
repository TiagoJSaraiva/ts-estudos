export default class Queue<T> {
    private items = new Map<number, T>();

    private head = 0;
    private tail = 0;

    enqueue(value: T): void {
        this.items.set(this.tail, value);
        this.tail++;
    }

    empty(): void {
        this.items.clear();
    }

    toArray(): T[] {
        const array: T[] = [];

        for(const [key, value] of this.items.entries()) {
            array.push(value);
        }

        return array;
    }

    list(): typeof this.items {
        return this.items;
    }

    dequeue(): T | undefined {
        if (this.head === this.tail) return undefined;
        const value = this.items.get(this.head);
        this.items.delete(this.head);
        this.head++
        return value;
    }

    peek(): T | undefined {
        return this.items.get(this.head);
    }

    isEmpty(): boolean {
        return this.head === this.tail;
    }
}

// const algumacoisa = new Queue<number>();

// algumacoisa.enqueue(159);
// console.log(algumacoisa.list());

// algumacoisa.enqueue(122);
// algumacoisa.enqueue(133);
// algumacoisa.peek();
// console.log(algumacoisa.list());
// console.log(algumacoisa.dequeue());
// console.log(algumacoisa.list());

