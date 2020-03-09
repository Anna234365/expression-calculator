// function eval() {
//     // Do not use eval!!!
//     return;
// }

function expressionCalculator(expr) {
    let arr = expr.replace(/[\s]{2}/g, ' ').trim().split(' ');
    let count = 0;
    arr.join('').split('').map(a => a == ')' ? count++ : a == '(' ? count -- : false)
    if (count != 0) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    if (arr.length == 1) {
        arr = arr[0].split('');
    }

    for(let x = 0; x < arr.length; x++) {
        if (arr[x] == '+' && arr[x+2] != '*' && arr[x+2] != '/' && arr[x+1] != '(' && arr[x-1] != ')') {
            arr[x+1] = Number(arr[x-1])+Number(arr[x+1]);
            arr.splice(x-1,2); 
            x=0;
        }
        if (arr[x] == '-' && arr[x+2] != '*' && arr[x+2] != '/' && arr[x+1] != '(' && arr[x-1] != ')') {
            arr[x+1] = Number(arr[x-1])-Number(arr[x+1]);
            arr.splice(x-1,2); 
            x=0;
        }
        if (arr[x] == '*' && arr[x+1] != '(' && arr[x-1] != ')') {
            arr[x+1] = Number(arr[x-1])*Number(arr[x+1]);
            arr.splice(x-1,2); 
            x=0; 
        }
        if (arr[x] == '/' && arr[x+1] != '(' && arr[x-1] != ')' && Number(arr[x+1]) != 0) {
            arr[x+1] = Number(arr[x-1])/Number(arr[x+1]);
            arr.splice(x-1,2); 
            x=0; 
        } else if (arr[x] == '/' && Number(arr[x+1]) == 0) {
            throw new Error("TypeError: Division by zero.");
        }
        if (arr[x-1] == '(' && arr[x+1] == ')') {
            arr[x+1] = Number(arr[x]);
            arr.splice(x-1,2); 
            x=0; 
        }
    }
    return arr[0];
}

module.exports = {
    expressionCalculator
}
