# The Backend of source

## Setting the environment for debugging

* Step 1: Install `chocolatey`: https://chocolatey.org/docs/installation
* Step 2: Install `python`: https://chocolatey.org/packages/python
* Step 2: Install `babel-node-debug`: `npm install -g babel-node-debug`

## Generate key for jsonwebtoken (using openssl on Windows)

* Gen key for jsonwebtoken:

```
ssh-keygen -t rsa -b 8192 -m PEM -f jwtRS256.pem
# Don't add passphrase
openssl rsa -in jwtRS256.pem -pubout -outform PEM -out jwtRS256.pub
```