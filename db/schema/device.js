import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    deviceId: Number,
    h: Number,
    t: Number,
    a: Number,
    lastUpdate: Number
}, { versionKey: false });

deviceSchema.methods.getData = function() {
    return {
        id: this.deviceId,
        lastUpdate: this.lastUpdate,
        a: this.a,
        h: this.h,
        t: this.t,
    };
};

export const Device = mongoose.model('Device', deviceSchema);
