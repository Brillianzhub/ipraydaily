function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i]; // The element to be placed at the correct position
        let j = i - 1;

        // Shift elements of arr[0..i-1] that are greater than key to one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }

        // Place the key in its correct position
        arr[j + 1] = key;
    }
}

// Example usage:
const myArray = [5, 3, 8, 6, 2];
insertionSort(myArray);
console.log(myArray); // Output: [2, 3, 5, 6, 8]
