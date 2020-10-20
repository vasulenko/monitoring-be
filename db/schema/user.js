import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : String,
    password: String,
    token: String
}, { versionKey: false });

userSchema.methods.getData = function() {
    return {
        email: this.email,
        password: this.password,
        token: this.token
    };
};

export const User = mongoose.model('User', userSchema);
