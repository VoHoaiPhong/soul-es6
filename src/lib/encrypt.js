import Encrypt from 'bcryptjs';

export default class Encryption {
  static get getSalt() {
    return Encrypt.genSaltSync(Math.floor((Math.random() * 12) + 1));
  }

  static hashing(str) {
    return Encrypt.hashSync(str, Encryption.getSalt);
  }

  static compare(str, hash) {
    return Encrypt.compareSync(str, hash);
  }
}