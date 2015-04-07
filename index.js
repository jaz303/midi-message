var Msg = (typeof Uint8Array === 'undefined') ? Array : Uint8Array;

function chmsg3(status, channel, byte1, byte2) {
    var msg = new Msg(3);
    msg[0] = status | (channel - 1);
    msg[1] = byte1;
    msg[2] = byte2;
    return msg;
}

function chmsg2(status, channel, val) {
    var msg = new Msg(2);
    msg[0] = status | (channel - 1);
    msg[1] = val;
    return msg;
}

exports.noteOff = noteOff;
function noteOff(channel, key, velocity) {
    return chmsg3(0x80, channel, key, velocity);
}

exports.noteOn = noteOn;
function noteOn(channel, key, velocity) {
    return chmsg3(0x90, channel, key, velocity);
}

exports.polyKeyPressure = polyKeyPressure;
function polyKeyPressure(channel, key, pressure) {
    return chmsg3(0xA0, channel, key, pressure);
}

exports.controlChange = controlChange;
function controlChange(channel, controller, value) {
    return chmsg3(0xB0, channel, controller, value);
}

exports.programChange = programChange;
function programChange(channel, prog) {
    return chmsg2(0xC0, channel, prog);
}

exports.channelPressure = channelPressure;
function channelPressure(channel, pressure) {
    return chmsg2(0xD0, channel, pressure);
}

exports.pitchBend = pitchBend;
function pitchBend(channel, value) {
    return chmsg3(0xE0, channel, value >> 8, value);
}

exports.controllerReset = controllerReset;
function controllerReset(channel) {
    return controlChange(channel, 0x79, 0x00);
}

exports.localControl = localControl;
function localControl(channel, on) {
    return controlChange(channel, 0x7A, on ? 0x7F : 0x00);
}

exports.allNotesOff = allNotesOff;
function allNotesOff(channel) {
    return controlChange(channel, 0x7B, 0x00);
}

exports.omniMode = omniMode;
function omniMode(channel, on) {
    return controlChange(channel, on ? 0x7D : 0x7C, 0x00);
}

exports.monoMode = monoMode;
function monoMode(channel, channels) {
    return controlChange(channel, 0x7E, channels || 0x00);
}

exports.polyMode = polyMode;
function polyMode(channel) {
    return controlChange(channel, 0x7F, 0x00);
}
