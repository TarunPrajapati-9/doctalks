import { User } from "../Models/User.js";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Doctor } from "../Models/Doctor.js";
import { Listing } from "../Models/Listing.js";

import mongoose from "mongoose";
//Register a User
const registerUser = asyncHandler(async (req, res) => {
    const { u_name, u_email, u_password } = req.body;

    if (!u_name || !u_email || !u_password) {
        res.status(400);
        res.status(400).json({ error: "Please fill all the fields" });
    }

    const userExists = await User.findOne({ u_email });

    if (userExists) {
        res.status(400);
        res.status(400).json({ error: "User already exists" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(u_password, 10);

    const user = await User.create({
        u_name,
        u_email,
        u_password: hashedPassword
    });

    if (user) {
        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, userEmail: user.u_email },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        res.status(201).json({
            _id: user.id,
            u_name: user.u_name,
            u_email: user.u_email,
            token: token
        });
    } else {
        res.status(400).json({ error: "User Not Created" });
    }
});
// --------------------------------------------------------------------------------------------------------------------------

//Login User
const loginUser = asyncHandler(async (req, res) => {
    const { u_email, u_password } = req.body;

    if (!u_email || !u_password) {
        res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await User.findOne({ u_email });

    if (user && (await bcrypt.compare(u_password, user.u_password))) {
        const token = jwt.sign(
            { userId: user._id, userEmail: user.u_email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            _id: user.id,
            u_name: user.u_name,
            u_email: user.u_email,
            token: token
        });
    } else {
        res.status(401).json({ error: "Invalid Credentials" })
    }
})

// --------------------------------------------------------------------------------------------------------------------------


//fetching all doctor 
const listDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();

        const doctorsWithAvgPrice = [];

        for (const doctor of doctors) {
            const listings = await Listing.find({ doctor_id: doctor._id });

            let totalPrice = 0;
            for (const listing of listings) {
                totalPrice += listing.price;
            }
            const averagePrice = listings.length > 0 ? totalPrice / listings.length : 0;

            doctorsWithAvgPrice.push({
                _id: doctor._id,
                averagePrice: averagePrice.toFixed(2),
                ...doctor._doc,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Doctors fetched successfully',
            data: doctorsWithAvgPrice,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching doctors',
            error: error.message,
        });
    }
}

// --------------------------------------------------------------------------------------------------------------------------
const getOneDoctor = async (req, res) => {

    try {
        const id = req.params.id;
        const isValidObjectId = mongoose.isValidObjectId;
        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid doctor ID' });
        }
        if (!id) {
            return res.status(404).json({ message: 'Doctor ID  found' });
        }
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        // resolve later..
        res.status(500).json({ message: 'not valid ID' });
    }
}

// --------------------------------------------------------------------------------------------------------------------------
const listing = async (req, res) => {
    try {
        const doctorID = req.params.id;
        console.log(req.body);
        const {date}= req.body;

        if (!doctorID) {
            return res.status(400).json({ message: "Missing required fields: doctorID " });
        }

        
            if (Object.keys(req.body).length == 0 ||date==null ) {
           
                // req.body is empty
                const query = {
                    doctor_id: doctorID
                };

                const listings = await Listing.find(query);
                if (listings.length > 0) {
                    return res.json({ listings });
                } else {
                    return res.status(400).json({ message: "No sessions found for the given doctor and date" });
                }
            } else {
                // req.body is not empty
                // if id and date both given..
                const formattedDate = new Date(date);
                formattedDate.setHours(0, 0, 0, 0);

                const endOfDay = new Date(date);
                endOfDay.setHours(23, 59, 59, 999);

                const query = {
                    doctor_id: doctorID,
                    time: { $gte: formattedDate, $lte: endOfDay },
                };

                const listings = await Listing.find(query);


                if (listings.length > 0) {
                    return res.json({ listings });
                } else {
                    return res.status(400).json({ message: "No sessions found for the given doctor and date" });
                }
            }


    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};









export { registerUser, loginUser, listDoctors, getOneDoctor, listing };
