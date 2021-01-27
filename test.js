const binaries = require('binaries_convertions');

const hex = 'AB9';
const dec = 784;
const bin = '111010'

// convert 1110 to decimal
console.log(`converted ${bin} to ${binaries.binaryToDec(bin)} in decimal`)

// convert 1110 to hexadecimal
console.log(`converted ${bin} to ${binaries.binaryToHexadecimal(bin)} in hexadecimal`)

// convert 784 to binary
console.log(`converted ${dec} to ${binaries.decToBinary(dec)} in binary`)

// convert 784 to hexadecimal
console.log(`converted ${dec} to ${binaries.decToHexadecimal(dec)} in hexadecimal`)

// convert AB9 to binary
console.log(`converted ${hex} to ${binaries.hexadecimalToBinary(hex)} in binary`)

// convert AB9 to decimal
console.log(`converted ${hex} to ${binaries.hexadecimalToDecimal(hex)} in decimal`)
