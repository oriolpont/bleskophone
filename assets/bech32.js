// Copyright (C) 2017 Pieter Wuille
// SPDX-License-Identifier: MIT

const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const ALPHABET_MAP = {};
for (let z = 0; z < ALPHABET.length; z++) {
    const x = ALPHABET.charAt(z);
    ALPHABET_MAP[x] = z;
}

function convert(data, inBits, outBits, pad) {
    let value = 0;
    let bits = 0;
    const maxV = (1 << outBits) - 1;
    const result = [];
    for (let i = 0; i < data.length; ++i) {
        value = (value << inBits) | data[i];
        bits += inBits;
        while (bits >= outBits) {
            bits -= outBits;
            result.push((value >> bits) & maxV);
        }
    }
    if (pad) {
        if (bits > 0) {
            result.push((value << (outBits - bits)) & maxV);
        }
    }
    else {
        if (bits >= inBits)
            return 'Excess padding';
        if ((value << (outBits - bits)) & maxV)
            return 'Non-zero padding';
    }
    return result;
}

function polymodStep(pre) {
    const b = pre >> 25;
    return (((pre & 0x1ffffff) << 5) ^
        (-((b >> 0) & 1) & 0x3b6a57b2) ^
        (-((b >> 1) & 1) & 0x26508e6d) ^
        (-((b >> 2) & 1) & 0x1ea119fa) ^
        (-((b >> 3) & 1) & 0x3d4233dd) ^
        (-((b >> 4) & 1) & 0x2a1462b3));
}
function prefixChk(prefix) {
    let chk = 1;
    for (let i = 0; i < prefix.length; ++i) {
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126)
            return 'Invalid prefix (' + prefix + ')';
        chk = polymodStep(chk) ^ (c >> 5);
    }
    chk = polymodStep(chk);
    for (let i = 0; i < prefix.length; ++i) {
        const v = prefix.charCodeAt(i);
        chk = polymodStep(chk) ^ (v & 0x1f);
    }
    return chk;
}
function encode(prefix, words, LIMIT) {
    LIMIT = LIMIT || 90;
    if (prefix.length + 7 + words.length > LIMIT)
        throw new TypeError('Exceeds length limit');
    prefix = prefix.toLowerCase();
    // determine chk mod
    let chk = prefixChk(prefix);
    if (typeof chk === 'string')
        throw new Error(chk);
    let result = prefix + '1';
    for (let i = 0; i < words.length; ++i) {
        const x = words[i];
        if (x >> 5 !== 0)
            throw new Error('Non 5-bit word');
        chk = polymodStep(chk) ^ x;
        result += ALPHABET.charAt(x);
    }
    for (let i = 0; i < 6; ++i) {
        chk = polymodStep(chk);
    }
    chk ^= 1;
    for (let i = 0; i < 6; ++i) {
        const v = (chk >> ((5 - i) * 5)) & 0x1f;
        result += ALPHABET.charAt(v);
    }
    return result;
}
