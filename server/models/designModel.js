import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user', 
            required: true,
        },
        designName: {type: String, required: true},
        desc: {type: String, required: true},
        image: { 
            data: { type: String, required: true },        
            contentType: { type: String, required: true },        
        }
    },
    { timestamps: true }
)

const designModel = mongoose.models.design || mongoose.model('design', designSchema);

export default designModel;