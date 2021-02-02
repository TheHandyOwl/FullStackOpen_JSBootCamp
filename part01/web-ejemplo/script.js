console.log("Hola Mundo!")

// Tipado débil (contrario a débil) significa que una variable puede cambiar de tipo string a tipo int y no pasa nada, porque lo acepta. let a = ""; a = 5;
// Tipado dinámico (contrario a fijo) significa que hace inferencia y no hace falta declarar el tipo de variable porque sabe que se trata de un string o un int. Así pues podemos decir let firstName = "";. Lo contrario sería lo que hace TypeScript, y es el tipado fijo. Sería let firstName : String = "";
let firstName = "Carlos";
const lastName = 4;
var isDeveloper = true;

console.log(firstName);
console.log(lastName);
console.log(isDeveloper);

let a = 1;
var b = 1;
console.log(`${a} == ${b}`); // 1, 1

if (a == 1) {
    let a = 5;
    var b = 5;
    console.log(`${a} == ${b}`); // 5, 5
}

console.log(`${a} != ${b}`); // 1, 5 -> Con let (a) no pasa nada, Con var (b) se mezclan distintos ámbitos y da problemas.

// null y undefined
let myNull = null;
let myUndefined;

// Tipos primitivos y la inmutabilidad
// - Number
// - String
// - Boolean
// - undefined
// - null
// - BigInt
// - Symbol

// Tipos no primitivos
// - Objeto: ya sea función, objeto, lista, array, diccionario, ...

const list = [];
list.push(157);
console.log(list);
const anotherList = list.concat(157);
console.log(anotherList);

const persona = {
    name: 'Miguel',
    twitter: '@midudev',
    age: 18,
    isDeveloper: true,
    links: ['https://midu.tube', 'https://midu.live']
}

const field = 'twitter';
console.log(persona.twitter);
console.log(persona['twitter']);
console.log(persona[field]);

// Funciones de primera cuando son iguales que otro valor y se pueden asignar
const sumar = (a, b) => {
    console.log(a);
    console.log(b);
    return (a + b);
}
console.log(sumar(3, 2))

// Funciones de primer orden: funciones que NO reciben funciones como parámetros
let greet = (who = "Mundo") => {
    console.log(`¡Hola ${who}!`)
}
greet();
greet("Carlos");

// Funciones de orden superior: funciones que SÍ reciben funciones como parámetros, como map, filter, reduce, etc.
const myList = [1, 2, 3, 4, 5];
const squared = myList.map(x => x ** 2); // => [1, 4, 9, 16, 25]
console.log("squared:", squared)
const even = myList.filter(x => x % 2 == 0); // => [2, 4]
console.log("even:", even)
const product = myList.reduce((acc, item) => acc * item, 1); // => 120
console.log("product:", product)