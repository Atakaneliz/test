import { AES, enc } from "crypto-js";

const secretKey = process.env.HASH_SECRET ?? ''

//? getCrypt Fonksiyonu ile şifrelenmiş veriyi çözüyoruz.
export const getCrypt = (password: string) => {
  const decodedStr = decodeURIComponent(password);
  const result = AES.decrypt(decodedStr, secretKey).toString(
    enc.Utf8
  );
  return result;
};

//? setCrypt Fonksiyonu ile veriyi şifreliyoruz.
export const setCrypt = (password: string) => {
  return AES.encrypt(password, secretKey).toString();
};
