class MinHeap {
    private heap: number[] = [];

    peek(): number | undefined {
        return this.heap[0];
    }

    see(): number[] {
        return this.heap;
    }

    bubbleUp(): void {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parent =
                Math.floor((index - 1) / 2);

            if ( this.heap[parent] <= this.heap[index] ) {
                break;
            }

            [ this.heap[parent], this.heap[index] ] = [ this.heap[index], this.heap[parent] ];

            index = parent;
        }
    }

    push(value: number): void {
        this.heap.push(value);
        this.bubbleUp();
    }
}

const heap = new MinHeap();

heap.push(16);
heap.push(91);
heap.push(32);
heap.push(12);
heap.push(9);
heap.push(3);

console.log(heap.see());

