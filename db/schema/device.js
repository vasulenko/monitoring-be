import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    macHash : String,
    deviceId: Number,
}, { versionKey: false });

deviceSchema.methods.getData = function() {
    return {
        id: this.deviceId,
        mac_hash: this.macHash
    };
};

export const Device = mongoose.model('Device', deviceSchema);
