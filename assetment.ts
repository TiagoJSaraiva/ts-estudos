function hasDuplicate(
    numbers: number[]
): boolean {
    const size = numbers.length;
    const newSize = new Set(numbers).size;

    return size !== newSize;
}

console.log(hasDuplicate([1, 2, 3, 5, 6]));