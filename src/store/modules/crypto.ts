import { defineStore } from "pinia";
import CryptoJS from "crypto-js";

export const useCryptoStore = defineStore({
  id: "crypto",
  state: () => ({
    secretPassphrase: CryptoJS.enc.Utf8.parse("0123456789qwerty"),
    iv: CryptoJS.enc.Utf8.parse("0123456789qwerty"),
  }),
  actions: {
    encrypt(message: string) {
      const { secretPassphrase, iv } = this;
      return CryptoJS.AES.encrypt(message, secretPassphrase, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv,
      }).toString();
    },
    decrypt(message: string) {
      const { secretPassphrase, iv } = this;
      return CryptoJS.AES.decrypt(message, secretPassphrase, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv,
      }).toString(CryptoJS.enc.Utf8);
    },
  },
});
