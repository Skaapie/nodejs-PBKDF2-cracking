nodejs-PBKDF2-cracking
======================
This is a proof-of-concept for cracking passwords hashed and salted with the PBKDF2 as typically used by NodeJS generators that scaffold complete projects of useful parts.

Yeoman generator was used in this case with basic (username & password).

The data from MongoDB was extracted to use as a sample.

http://en.wikipedia.org/wiki/PBKDF2
http://passportjs.org/
http://yeoman.io/

The password list used is from: https://github.com/discourse/discourse/blob/master/lib/common_passwords/10k-common-passwords.txt