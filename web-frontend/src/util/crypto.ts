import CryptoJS from 'crypto-js/core'
import pbkdf2 from 'crypto-js/pbkdf2'
import base64 from 'crypto-js/enc-base64';

interface EncodedPass {
  hash: string;
  salt: string;
}

export const encodePass = (password: string, base64Salt?: string): EncodedPass => {
  // use provided salt or generate one if it doesn't exist
  const salt = base64Salt
    ? base64.parse(base64Salt)
    : CryptoJS.lib.WordArray.random(128 / 8);

  // hash the password using PBKDF2
  const hash = pbkdf2(password, salt, {
    keySize: 256 / 32,
  });

  return {
    hash: base64.stringify(hash),
    salt: base64.stringify(salt),
  };
};
