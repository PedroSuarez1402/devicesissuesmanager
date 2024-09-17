import mongoose, {Schema} from "mongoose";

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    creatorName: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})

const Note = mongoose.model('Note', noteSchema );

export default Note;