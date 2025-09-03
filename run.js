// run.js

import fs from 'fs';
import path from 'path';

// 1. Load and parse the JSON
const raw  = fs.readFileSync(path.resolve('test.json'), 'utf8');
const data = JSON.parse(raw);

// 2. Destructure the top-level keys and cases
const { keys, ...cases } = data;
console.log(`n = ${keys.n}, k = ${keys.k}\n`);

// 3. Convert each case value → decimal and collect roots
const roots = [];
for (const id of Object.keys(cases)) {
  const { base, value } = cases[id];
  const dec = parseInt(value, Number(base));
  console.log(`Case ${id}: "${value}" (base ${base}) → ${dec}`);
  roots.push(dec);
}

// 4. Build monic polynomial from these roots
function rootsToPolynomial(roots) {
  let coeffs = [1];
  for (const r of roots) {
    const next = new Array(coeffs.length + 1).fill(0);
    for (let i = 0; i < coeffs.length; i++) {
      next[i + 1] += coeffs[i];      // × x
      next[i]     -= coeffs[i] * r;  // × (−r)
    }
    coeffs = next;
  }
  return coeffs;
}

console.log('\nPolynomial coefficients (constant first):');
console.log(rootsToPolynomial(roots));
