(() => { 

class Stack<T> {
    private stack: T[] = [];

    public push(value: T): void {
        this.stack.push(value);
    }

    public pop(): T | undefined {
        return this.stack.pop();
    }

    public isEmpty(): boolean {
        if (this.stack.length > 0) return false;
        return true;
    }

    public peek(): T | undefined {
        return this.stack[this.stack.length - 1];
    }
}

function dfs(
    graph: Map<string, string[]>,
    start: string
): void {
    const visited = new Set<string>();
    const stack = new Stack<string>();

    stack.push(start);

    while (!stack.isEmpty()) {
        const node = stack.pop()!;

        if (visited.has(node)) {
            continue;
        }

        visited.add(node);

        console.log(node);

        for (const neighbor of graph.get(node) ?? []) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }
}

})