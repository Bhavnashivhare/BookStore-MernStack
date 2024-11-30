import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title:{
            type : String,
            reqired : true,
        },
        author:{
            type: String,
            required : true,

        },
        publishYear:{
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
export const Book = mongoose.model('Cat', bookSchema);
