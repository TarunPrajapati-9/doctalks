import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({

    d_name: { type: String, unique: true },
    d_email: { type: String, unique: true },
    d_password: String,
    d_certificate: Buffer,
    d_rating: { type: Number, default: 0 },
    d_specialization: String,
    balance: { type: Number, default: 0 },
    Listing: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
    Session: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
});

export const Doctor = mongoose.model('Doctor', doctorSchema, 'Doctor');
