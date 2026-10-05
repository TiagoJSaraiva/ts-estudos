class Stack<T> {
    private items: T[] = [];

    push(value: T): void {
        this.items.push(value);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const something = new Stack<string>();

something.push("ola");
something.push("tchau");
something.push("opa");

console.log(something.pop());
console.log(something.peek());


