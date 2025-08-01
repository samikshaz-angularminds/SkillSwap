import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const connectionSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    respondedAt: { type: Date }
});

const Connection = model('Connection',connectionSchema);

export default Connection;