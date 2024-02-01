import { string } from 'joi';
import mongoose from 'mongoose';
export type chatType = {
    timesStamp: Date,
    messeges: String[],
    users: mongoose.Schema.Types.ObjectId[]

}

const chatSchema = new mongoose.Schema<chatType>({
    timesStamp: {
        type: Date,
        default: Date.now,
    },
    messeges: [{
        type: String
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
});

export default mongoose.model<chatType>('Chat', chatSchema);