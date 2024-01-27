// app.js
const calculadora = require('./calculadora');

console.log(calculadora.soma(15, 24));
console.log(calculadora.mult(15, 24));
console.log(calculadora.sub(15, 24));
console.log(calculadora.divs(15, 24));

let resultadoSoma = calculadora.soma(13, 45);
let resultMult = calculadora.mult(13, 45);

console.log(resultMult);
console.log(resultadoSoma);
