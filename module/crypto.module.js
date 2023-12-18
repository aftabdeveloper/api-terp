const CryptoJS = require("crypto-js");

const encrypt = (data)=>{
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
    return ciphertext;
}

const decrypt = (string)=>{
    try
    {
        const bytes = CryptoJS.AES.decrypt(string,process.env.CRYPTO_SECRET);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
    catch(err)
    {
        return null;
    }
}

module.exports = {
    encrypt,
    decrypt
}