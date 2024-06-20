import { defineStore } from "pinia";
import CryptoJS from "crypto-js";

export const useCryptoStore = defineStore({
  id: "crypto",
  state: () => ({
    secretPassphrase: CryptoJS.enc.Utf8.parse("qwerty0123456789"),
    iv: CryptoJS.enc.Utf8.parse("0123456789qwerty"),
  }),
  actions: {
    encrypt(message: string,_secretPassphrase?:string) {
      const { secretPassphrase, iv } = this;
      return CryptoJS.AES.encrypt(message, _secretPassphrase || secretPassphrase, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv,
      }).toString();
    },
    decrypt(message: string,_secretPassphrase?:string) {
      const { secretPassphrase, iv } = this;
      return CryptoJS.AES.decrypt(message, _secretPassphrase || secretPassphrase, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv,
      }).toString(CryptoJS.enc.Utf8);
    },
  },
});
