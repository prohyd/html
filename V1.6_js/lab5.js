// decrypt_bits.js
// Запуск: node decrypt_bits.js

// 1. Зашифрованный текст (6-битные блоки)
const cipherBits = `
001110 010001 010110 010001 010011 011101 000010 000111 111100 001101 011101
001000 000000 000001 010111 010001 011011 110011 001100 011101 000110 010101
011110 010111 010100 000101 101111 000010 010001 001111 001001 010111 001010
011101 001001 111111 010011 000111 001011 000101 001110 000100 011110 001100
100011 001111 011001 011000 011011 011111 000110 010001 000111 100101 000010
011010 000001 010000 011101 000110 010100 000110 100001 010010 000111 001011
101001 000000 001010 011101 010100 110010 010011 010110 000100 011101 000011
011110 010001 001011 101100 100000 110100 010110 001011 011100 000110 011100
000000 101101 011100 000110 001000 101001 011110 000110 011110 000111 110100
010000 000101 000100 001011 011111 101111 010100 011010 110010 000010 011011
001101 000100 000001 010111 010001 011011 110011 011101 010001 001001
`.trim().split(/\s+/);
const alphabet = [
  'а','б','в','г','д','е','ё','ж','з','и','й',
  'к','л','м','н','о','п','р','с','т','у','ф',
  'х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'
];
function charToBits(char) {
  const index = alphabet.indexOf(char);
  if (index === -1) {
    throw new Error(`Символ "${char}" не найден в алфавите`);
  }
  return index.toString(2).padStart(6, '0');
}

function bitsToChar(bits) {
  const index = parseInt(bits, 2);
  return alphabet[index] ?? '?';
}

function xorBits(a, b) {
  let result = '';
  for (let i = 0; i < a.length; i++) {
    result += a[i] === b[i] ? '0' : '1';
  }
  return result;
}

function decryptWithKey(key) {

  const keyBits = [];
  for (let i = 0; i < key.length; i++) {
    keyBits.push(charToBits(key[i]));
  }

  let result = '';

  for (let i = 0; i < cipherBits.length; i++) {
    const cipher = cipherBits[i];                
    const keyBit = keyBits[i % keyBits.length];
    const plainBits = xorBits(cipher, keyBit);    
    const plainChar = bitsToChar(plainBits);
    result += plainChar;
  }

  return result;
}

const keys = [
  "криптография",
  "велосипед",
  "соревнования",
  "модификация",
  "аудитория",
  "редактор",
  "методология"
];

for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  console.log("Ключ:", key);
  try {
    const text = decryptWithKey(key);
    console.log(text);
  } catch (e) {
    console.log("Ошибка:", e.message);
  }
  console.log("--------------------");
}