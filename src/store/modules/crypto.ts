import { defineStore } from "pinia";
import CryptoJS from "crypto-js";

export const useCryptoStore = defineStore({
  id: "crypto",
  state: () => ({
    secretPassphrase: "qwerty0123456789",
    iv: "0123456789qwerty",
  }),
  actions: {
    encrypt(message: string, _secretPassphrase?: string, _iv?: string) {
      const { secretPassphrase, iv } = this;
      return CryptoJS.AES.encrypt(
        message,
        CryptoJS.enc.Utf8.parse(_secretPassphrase || secretPassphrase),
        {
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          iv: CryptoJS.enc.Utf8.parse(_iv || iv),
        }
      ).toString();
    },
    decrypt(message: string, _secretPassphrase?: string, _iv?: string) {
      const { secretPassphrase, iv } = this;
      return CryptoJS.AES.decrypt(
        message,
        CryptoJS.enc.Utf8.parse(_secretPassphrase || secretPassphrase),
        {
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          iv: CryptoJS.enc.Utf8.parse(_iv || iv),
        }
      ).toString(CryptoJS.enc.Utf8);
    },
  },
});
