export function numberToWan(num) {
    num = Number(num);
    if (num === 0) {
        return num + '';
    } else
    if (num > 1 && num < 10000) {
        return num + '';
    } else {
        return (num / 10000).toFixed(2) + '万';
    }
}


export function deleteArray(arr,value){
        let i = arr.length;
        while (i--) {
            if (arr[i] === value) {
                arr.splice(i, 1);
            }
        }
        return arr;
}


export function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value % 60);
    return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
}