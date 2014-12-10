nodejs-PBKDF2-cracking
======================
This is a proof-of-concept for cracking passwords hashed and salted with the PBKDF2. It is commonly used by the Passport authentication middleware and is used by some NodeJS generators, in this case Yeoman.

Yeoman generator was used in this case with basic (username & password) authentication.

The user data from MongoDB was extracted to use as a sample.

http://en.wikipedia.org/wiki/PBKDF2

http://passportjs.org/

http://yeoman.io/

The password list used is from:
https://github.com/discourse/discourse/blob/master/lib/common_passwords/10k-common-passwords.txt

* This project is strictly for educational purpouses. I am in no way, shape, or form responsible for what you do with this code. Use responsibly. *