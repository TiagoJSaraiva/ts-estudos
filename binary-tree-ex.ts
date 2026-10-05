
class TreeNode {
    constructor(
        public value: number,
        public left: TreeNode | null = null,
        public right: TreeNode | null = null
    ) {}
}

export class BinarySearchTree {
    protected root: TreeNode | null = null;

    protected maxValue: TreeNode | null = null;
    protected minValue: TreeNode | null = null;

    public insert(value: number): void {

        let wentleft = false;
        let wentrigth = false;

        const node = new TreeNode(value);

        if (this.root === null) {
            this.root = node;
            return;
        }

        let current : TreeNode | null = this.root;

        while(true) {
            if( node.value === current.value ) return;
            if( node.value < current.value ) {
                wentleft = true;
                if(current.left === null) {
                    current.left = node;
                    break;
                }
                current = current.left;
            } else {
                wentrigth = true;
                if(current.right === null) {
                    current.right = node;
                    break;
                }
                current = current.right;
            }
        }

        if(wentrigth && !wentleft) {
            this.maxValue = node;
        } else if (wentleft && !wentrigth) {
            this.minValue = node;
        }
    }

    public has(value: number): boolean {
        let current : TreeNode | null  = this.root;

        if(current === null) return false;

        while(true) {
            if (current.value === value) return true;
            if(current.value >= value) {
                current = current.left;
            } else {
                current = current.right;
            }
            if (current === null) return false;
        }
    }

    public min(): number | undefined {
        if(this.minValue === null) return this.root?.value;

        return this.minValue?.value;
    }

    public max(): number | undefined {
        if(this.maxValue === null) return this.root?.value;

        return this.maxValue?.value;
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
// metodos min e max não percorrem árvore, então são O(1) ao invés de O(log n)
// ideia de super otimização: criar 2 "root", um para números pares e outro para ímpares. Complexidade ia se manter log n mas em casos de por exemplo, 100000 registros, se +- cada metade estivesse em uma estrutura diferente, poderia acelerar de forma considerável operações de busca, criação de elemento, etc, e outras O(log n), sem nenhum custo relevante adicional. 
}

const bst = new BinarySearchTree();

// for(let i = 0; i < 20; i++)  {
//     bst.insert(Math.floor(Math.random() * 100));
// }

bst.insert(40);
bst.insert(42);
bst.insert(26);
bst.insert(15);
bst.insert(4);
bst.insert(52);
bst.insert(86);
bst.insert(35);
bst.insert(39);
bst.insert(86);
bst.insert(14);
bst.insert(19);
bst.insert(14);
bst.insert(98);
bst.insert(71);
bst.insert(81);
bst.insert(15);
bst.insert(89);
bst.insert(21);
bst.insert(60);
bst.insert(60);
bst.insert(60);
bst.insert(60);

console.log(
    bst.min(),
    bst.max(),
    bst.has(97),
    bst.has(71)
);

console.log(bst.toMermaid());
