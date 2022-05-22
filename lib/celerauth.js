'use strict';

let Discord = require('./celerauth/discord').Discord
let Spotify = require('./celerauth/spotify').Spotify
let Github = require('./celerauth/github').Github

module.exports = {
    Discord: Discord,
    Spotify: Spotify,
    Github: Github
}