'use strict';

const axios = require('axios')

class Github {
    constructor({
        clientId,
        clientSecret,
        redirect,
        scope
    }) {
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirect = redirect
        this.scope = scope.join(" ")
        this.authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}&scope=${scope}`
    }

    getUrl() {
        return this.authUrl
    }

    async getToken(code) {
        const data = {
            method: 'post',
            url: 'https://github.com/login/oauth/access_token',
            data: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: code,
                redirect_uri: this.redirect
            }
        }

        try {
            const response = await axios(data)
            return response.data
        } catch (error) {
            return new Error(error)
        }
    }

    async getUser(token) {
        const data = {
            method: 'get',
            url: 'https://api.github.com/user',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const response = await axios(data)
            return response.data
        } catch (error) {
            return new Error(error)
        }
    }
}

module.exports = {
    Github: Github
}