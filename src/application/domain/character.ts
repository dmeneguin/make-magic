import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    school: { type: String, required: true },
    house: { type: String, required: true },
    patronus: { type: String, required: true }
});

const model = mongoose.model('Character', schema);
export default model;