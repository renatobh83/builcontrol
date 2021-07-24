import crypto from "crypto";

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const algorithm = "aes-256-cbc";

function encrypt(text, user) {
  var cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key),
    Buffer.from(iv, "hex")
  );
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return { encryptedData: crypted, user, iv, key };
}
function decrypt(textA) {
  const decrypt = [];
  textA.forEach((text) => {
    var decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(text.key),
      Buffer.from(text.iv, "hex")
    );
    var dec = decipher.update(text.encryptedData, "hex", "utf8");

    dec += decipher.final("utf8");

    decrypt.push(JSON.parse(dec));
  });

  return decrypt;
}

export { encrypt, decrypt };
