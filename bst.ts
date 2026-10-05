class TreeNode {
    constructor(
        public value: number,
        public right: TreeNode | null = null,
        public left: TreeNode | null = null
    ) {}
}

class BinarySearchTree {
    root: TreeNode | null = null;

    public insert(value: number): void {
        const node = new TreeNode(value);

        console.log(`\n[insert] Quero inserir o valor ${value}.`);
        console.log("[regra] Em uma BST: valores menores ficam à esquerda; maiores ficam à direita.");

        if (this.root === null) {
            console.log(`[insert] A árvore está vazia, então ${value} se torna a raiz.`);
            this.root = node;
            return;
        }

        let current = this.root;

        while (true) {
            console.log(`[insert] Comparando ${value} com o nó atual ${current.value}.`);

            if (value < current.value) {
                console.log(`[insert] ${value} é menor que ${current.value}; vou para a esquerda.`);

                if (current.left === null) {
                    console.log(`[insert] A esquerda de ${current.value} está vazia; inserindo ${value} ali.`);
                    current.left = node;
                    return;
                }

                current = current.left;
            } else {
                if (value === current.value) {
                    console.log(`[insert] ${value} é igual a ${current.value}; nesta implementação, valores repetidos vão para a direita.`);
                } else {
                    console.log(`[insert] ${value} é maior que ${current.value}; vou para a direita.`);
                }

                if (current.right === null) {
                    console.log(`[insert] A direita de ${current.value} está vazia; inserindo ${value} ali.`);
                    current.right = node;
                    return;
                }

                current = current.right;
            }
        }
    }

    has(value: number): boolean {
        if (this.root === null) return false;

        let current: TreeNode | null = this.root;

        while(current !== null) {
            if ( value === current.value ) return true;
            if ( value < current.value ) {
                current = current.left;
            } else { 
                current = current.right;
            }
        }

        return false;
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

const arvore = new BinarySearchTree();

for(let i = 0; i < 50; i++) {
    arvore.insert(rand());
}

console.log(arvore.toMermaid());

function rand() {
    return Math.floor(Math.random() * 500);
}

console.log(arvore.has(10));
