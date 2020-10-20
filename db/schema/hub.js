import mongoose from 'mongoose';

const hubSchema = new mongoose.Schema({
    hubId: Number,
    address: String,
    name: String,
    devices: Array
}, { versionKey: false });

hubSchema.methods.getData = function() {
    return {
        id: this.hubId,
        address: this.address,
        name: this.name,
        devices: this.devices
    };
};

export const Hub = mongoose.model('Hub', hubSchema);
