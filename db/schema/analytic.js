import mongoose from 'mongoose';

const analyticSchema = new mongoose.Schema({
    organisation : Number,
    timestamp: Number,
    data: Object
}, { versionKey: false });

analyticSchema.methods.getData = function() {
    return {
        organisation: this.organisation,
        timestamp: this.timestamp,
        data: this.data
    };
};

export const Analytic = mongoose.model('Analytic', analyticSchema);
