(() => {

type HeapMode = "min" | "max";

class TreeNode {
    constructor(
        public value: number,
        public right: TreeNode | null = null,
        public left: TreeNode | null = null
    ) {}
}

class Heap {
    private root: TreeNode | null = null;
    private layer: number = 0;
    private pathDeterminator: number = 0;

    constructor(private readonly mode: HeapMode) {}

    public insert(value: number): void {
        const node = new TreeNode(value);
    
        if(this.root === null) { 
            this.root = node;
            return;
        }

        const nextPosition = this.getNextPosition();
        const insertedPath = this.verifyNode( node, nextPosition.pathDeterminator, nextPosition.layer );

        if(insertedPath === null) {
            throw new Error("A proxima posicao esperada do heap ja esta ocupada.");
        }

        this.layer = nextPosition.layer;
        this.pathDeterminator = nextPosition.pathDeterminator;
        this.bubbleUp(node, insertedPath);
    }

    
    public peek(): number | void {
        if( this.root === null ) {
            console.log("Heap está vazio");
            return;
        }
        return this.root.value;
    }

    private getNextPosition(): { layer: number, pathDeterminator: number } {
        const maxDeep = this.getMaxDeep(this.layer);

        if(this.pathDeterminator === maxDeep) {
            return { layer: this.layer + 1, pathDeterminator: 0 };
        }

        return { layer: this.layer, pathDeterminator: this.toBinary(this.toDecimal(this.pathDeterminator) + 1)};
    }

    private verifyNode(node: TreeNode, pathDeterminatorNumber: number, layer: number): string | null {
        const pathDeterminator = String(pathDeterminatorNumber).padStart(layer, "0");
        let current = this.root;

        if(current === null) return null;

        for (const char of pathDeterminator) {
            if(char === "0") {
                if (current.left === null) {
                    current.left = node;
                    return pathDeterminator;
                } else {
                    current = current.left;
                }
            } else if (char === "1") {
                if (current.right === null) {
                    current.right = node;
                    return pathDeterminator;
                } else {
                    current = current.right;
                }
            }
        }

        return null;
    }

    private bubbleUp(insertedNode: TreeNode, insertedPath: string): void {
        let currentNode = insertedNode;
        let currentPath = insertedPath;

        while(currentPath.length > 0) {
            const parentPath = currentPath.slice(0, -1);
            const parentNode = this.getNodeFromPath(parentPath);
            const mustSwap = this.mode === "min"
                ? currentNode.value < parentNode.value
                : currentNode.value > parentNode.value;

            if(!mustSwap) {
                return;
            }

            const currentValue = currentNode.value;
            currentNode.value = parentNode.value;
            parentNode.value = currentValue;

            currentNode = parentNode;
            currentPath = parentPath;
        }
    }

    private getNodeFromPath(path: string): TreeNode {
        if(this.root === null) {
            throw new Error("Nao e possivel procurar um no em um heap vazio.");
        }

        let current: TreeNode | null = this.root;

        for(const char of path) {
            current = char === "0" ? current.left : current.right;

            if(current === null) {
                throw new Error(`Caminho invalido no heap: ${path}`);
            }
        }

        return current;
    }

    private toDecimal(binary: number) {
        return parseInt(String(binary), 2);
    }

    private toBinary(decimal: number) {
        return Number(decimal.toString(2));
    }

    private getMaxDeep(layer: number) {
        let maxDeep = 0;
        let multiplier = 1;
        for(let i = 0; i < layer; i++) {
            maxDeep = maxDeep + 1 * multiplier;
            multiplier = multiplier * 10;
        }
        return maxDeep;
    }

    public toMermaid(): string {
        const lines = ["```mermaid", "graph TD"];
        let nextId = 0;

        const addNode = (node: TreeNode): string => {
            const nodeId = `node${nextId++}`;
            lines.push(`    ${nodeId}["${node.value}"]`);

            if (node.left !== null) {
                const leftId = addNode(node.left);
                lines.push(`    ${nodeId} -->|esquerda| ${leftId}`);
            }

            if (node.right !== null) {
                const rightId = addNode(node.right);
                lines.push(`    ${nodeId} -->|direita| ${rightId}`);
            }

            return nodeId;
        };

        if (this.root === null) {
            lines.push('    empty["Árvore vazia"]');
        } else {
            addNode(this.root);
        }

        lines.push("```");
        return lines.join("\n");
    }
}

const values = [1, 8, 3, 13, 34, 3, 13, 34, 3, 13, 34];
const minHeap = new Heap("min");
const maxHeap = new Heap("max");

for(const value of values) {
    minHeap.insert(value);
    maxHeap.insert(value);
}

console.log("Min-heap:");
console.log(minHeap.toMermaid());
console.log("Max-heap:");
console.log(maxHeap.toMermaid());

/*
Próximas ideias:
- Guardar valor do pathDeterminator pra sempre ter localização da cauda em casos de querer deletar a cauda
- Guardar valor do pathDeterminator pra sempre que um novo valor entrar, poder reutiliza-lo

*/ 

})()

