'use strict';

const axios = require('axios')
const {
    URLSearchParams
} = require('url')

class Discord {
    constructor({
        clientId,
        clientSecret,
        redirect,
        scope = ['identify']
    }) {
        this.clientId = clientId,
            this.clientSecret = clientSecret,
            this.redirect = redirect,
            this.scope = scope.join(" ")

        this.authUrl = `https://discordapp.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect}&scope=${scope}&response_type=code`
    }

    getUrl() {
        return this.authUrl
    }

    async getToken(code) {
        const params = new URLSearchParams()
        params.append('client_id', this.clientId)
        params.append('client_secret', this.clientSecret)
        params.append('grant_type', 'authorization_code')
        params.append('code', code)
        params.append('redirect_uri', this.redirect)
        params.append('scope', this.scope)
        const data = {
            method: 'post',
            url: 'https://discord.com/api/oauth2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            data: params
        }

        try {
            const response = await axios(data)
            return response.data
        } catch (error) {
            return error.response.data
        }
    }

    async getUser(token) {
        const data = {
            method: 'get',
            url: 'https://discordapp.com/api/users/@me',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }

        try {
            const response = await axios(data)
            return response.data
        } catch (error) {
            return error.response.data
        }
    }
}

module.exports = {
    Discord: Discord
}