'use strict';

const axios = require('axios')

class Spotify {
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
        this.authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect}&scopes=${scope}`
    }

    getUrl() {
        return this.authUrl
    }

    async getAppToken() {
        const data = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            params: {
                grant_type: 'client_credentials'
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: this.clientId,
                password: this.clientSecret
            }
        }

        try {
            const response = await axios(data)
            return response.data
        } catch (error) {
            return new Error(error)
        }
    }

    // async getUserToken(code) {
    //     const data = {
    //         url: 'https://accounts.spotify.com/api/token',
    //         method: 'post',
    //         params: {
    //             grant_type: 'authorization_code'
    //         },
    //         headers: {
    //             'Accept':'application/json',
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': 'Basic ' + (new Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64'))
    //         },
    //         data: {
    //             code: code,
    //             redirect_uri: this.redirect,
    //         }
    //     }

    //     try {
    //         const response = await axios(data)
    //         return response.data
    //     } catch (error) {
    //         return new Error(error)
    //     }
    // }
}

module.exports = {
    Spotify: Spotify
}