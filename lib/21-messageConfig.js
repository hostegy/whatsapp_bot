// Channel attribution for bot messages. Replaces the previously obfuscated version.
// Points to the OWNER's channel from settings; empty JID disables attribution entirely.
const settings = require('../settings');

function buildChannelInfo() {
    if (!settings.channelJid) return {};
    return {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: settings.channelJid,
                newsletterName: settings.channelName,
                serverMessageId: -1
            }
        }
    };
}

const channelInfo = buildChannelInfo();

module.exports = { channelInfo, buildChannelInfo };
