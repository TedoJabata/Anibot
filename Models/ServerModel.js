const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Server = new Schema({
    name: String,
    serverId: String,
    joinLeaveChannelId: String,
    mutedRoleName: String,
    memberRoleName: String,
    verifiedRoleName: String,
});

mongoose.model('Server', Server)
module.exports = mongoose.model('Server', Server, "serverConfigs")