// test2(); 

// function test() {
//     console.log('here');
// }

// const test2 = () => {
//     console.log('here');
// }

function show() {
    if (true) {
        var number1 = 1;
        let number2 = 2;
        const number3 = 3;
    }

    console.log(number1);
    // console.log(number2);
    // console.log(number3);
}

// show()

const obj = {
    name: "Adrian",
    email: "adrian.lungu@csie.ase.ro"
}

obj.yearsOld = 25

// obj = {}

// console.log(obj)

const arr = [1,2,3,4]

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

const forEachArr = arr.forEach((el, index) => {
    console.log(el , index)
})

arr.map((el, index) => {
    return el * 2;
})

for (el of arr) {
    console.log(el)
}

for (el in arr) {
    console.log(el)
}

// if ( 3 === '3') {
//     console.log('same number')
// } else {
//     console.log('not the same number')
// }