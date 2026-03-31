import { model, Schema } from "mongoose";

const messagesSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const message = model("message", messagesSchema);

export default message;