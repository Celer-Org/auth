# CelerCore Auth

Celer Core Auth is a library with auth.

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install celercore/auth.

```bash
npm i @celercore/auth
```

## Usage

```javascript
const { Discord } = require('@celercore/auth')
const express = require('express')

const discordAuth = new Discord({
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    redirect: 'REDIRECT_URI',
    scope: ['identify']
})

const app = express()

app.get('/login', (req, res) => {
    res.redirect(discordAuth.getUrl())
})

app.get('/callback', async (req, res) => {
    res.send(await discordAuth.getToken(req.query.code))
})

app.listen(3000, () => console.log('Listening...'))
```

## Auth providers
- [x] Discord
- [x] Github
- [ ] Spotify
- [ ] Google
- [ ] MetaMask
- [ ] Steam

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
