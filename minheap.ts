(() => {

class MinHeap {
    private heap: number[] = [];

    public insert(value: number): void {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    public see(): number[] {
        return this.heap; // Adicionei esse para debugging
    }

    private bubbleUp(index: number): void {
        while(index > 0) {
            const parent = Math.floor((index - 1)/2);

            if(this.heap[index] >= this.heap[parent]) break;

            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];

            index = parent;
        }        
    }

    public peek(): number {
        return this.heap[0];
    }

    public size(): number {
        return this.heap.length;
    }

    public extractMin(): number | undefined {
        if(this.heap.length === 0) return undefined;

        const min = this.heap[0];
        this.heap.shift();
        for(let i = this.heap.length-1; i > 0; i--) {
            this.bubbleUp(i);
        }

        return min; 
    }
}

const heap = new MinHeap();

heap.insert(16);
heap.insert(91);
heap.insert(32);
heap.insert(12);
heap.insert(9);
heap.insert(3);

console.log(heap.see());

console.log(heap.peek());

console.log(heap.extractMin());

console.log(heap.see());


})()