## Running on localhost with https (Windows)

1. Run [mkcert](https://github.com/FiloSottile/mkcert). This will handle creating the RootCA certificates and adding them to your trusted certificate authorities on your machine.

```
> mkcert -install
```

2. Create the key and certificate files and put them into the `/certificates/` directory of the project.

```
mkcert localhost 127.0.0.1
```

3. Server.js and package.json have been updated to use HTTPS, so when starting up your project in a powershell window, set the "NODE_EXTRA_CA_CERTS" environment variable in powershell, then run the dev server.

```
> $env:NODE_EXTRA_CA_CERTS="C:\Users\Lucas\AppData\Local\mkcert\rootCA.pem"
> npm run devhttps
```

Note: You might need to manually separately install the `mongodb` node package for some reason.

```
> npm install mongodb
```

TODO:

- [ ] Home Page
- [ ] About Page
- [ ] Search
- [ ] Filter
- [ ] User profiles
- [ ] Review images
