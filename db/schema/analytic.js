import mongoose from 'mongoose';

const analyticSchema = new mongoose.Schema({
    deviceId : Number,
    hubId: Number,
    timestamp: Number,
    data: Object
}, { versionKey: false });

analyticSchema.methods.getData = function() {
    return {
        deviceId: this.deviceId,
        hubId: this.hubId,
        timestamp: this.timestamp,
        data: this.data
    };
};

export const Analytic = mongoose.model('Analytic', analyticSchema);
