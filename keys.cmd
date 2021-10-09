openssl genrsa -out keystore/key.pem
openssl req -new -key keystore/key.pem -out keystore/csr.pem
openssl x509 -req -days 9999 -in keystore/csr.pem -signkey keystore/key.pem -out keystore/cert.pem
rm keystore/csr.pem