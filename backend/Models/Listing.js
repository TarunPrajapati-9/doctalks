import mongoose from 'mongoose';

// const listingSchema = new mongoose.Schema({
//     _id: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         unique: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     doctorID: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         unique: true
//     },
//     avg_duration: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String,
//         required: false
//     },
//     time: {
//         type: Date,
//         required: false
//     },
//     endtime: {
//         type: Date,
//         required: false
//     }
// });


const listingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    title: String,
    price: Number,
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    avg_duration: Number,
    description: String,
    time: Date,
    endtime: Date
});

export const Listing = mongoose.model('Listing', listingSchema,'Listing');
