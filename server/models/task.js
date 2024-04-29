import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    priority: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}
);

export const Task = mongoose.models.Task || model("task", schema);