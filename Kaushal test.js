const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newArr = [];
const oldArr = [];
function rotateArr(arr, n) {
    for (let i = 0; i < n; i++){
        newArr[i] = arr[i];
    }
    for (let i = n; i < arr.length; i++){
        oldArr.push(arr[i]);
    }
    return [...oldArr,...newArr];
}
console.log(rotateArr(arr,4));