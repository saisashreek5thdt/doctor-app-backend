const Patient  = require('../models/Patient');
const Doctor = require('../models/Doctor');

const jwt = require('jsonwebtoken');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports.login = async (req, res) => {
    try {
        let user = "";
        if(req.body.user == "doctor") {
            user = await Doctor.findOne({email: req.body.email})
        } else if(req.body.user == "patient") {
            user = await Patient.findOne({email: req.body.email})
        } else {
            return res.status(500).json({
                success: false,
                message: "User type is required",
            })
        }
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Patient not found",
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000); //6 digit integer otp

        user.otp = otp;
        user.otpExpiresIn = Date.now() + 3600000; // 1 hour
        await user.save();

        // await twilio.messages.create({
        //     from: '+16508816310',
        //     to: patient.phone,
        //     body: `Hello ${patient.name},\n`+
        //     `Your OTP for Login access is - ${otp}\n\n`+
        //     `Thanks,\n`+
        //     `Team KalpaVriksh`
        // }).then(() => {
        //     console.log("Message has send"); 
        // }).catch((err) => {
        //     console.log(err.message)
        //     return res.status(500).json({ success: false, message: "OTP sending error"});
        // });

        const msg = {
        to: user.email,
        from: 'Health Vriksh <contactus@healthvriksh.com>',
        subject: 'Authentication Request for Doctor App',
        text: `Hello ${user.name},\n`+
            `Your OTP for Login access is - ${otp}\n\n`+
            `Thanks,\n`+
            `Team KalpaVriksh`,
        };
        await sgMail.send(msg);

        return res.status(200).json({
            success: true,
            message: "OTP had send to your mailid and phone number",
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

module.exports.submitOtp = async (req, res) => {
    try {
        let user = "";
        if(req.body.user == "doctor") {
            user = await Doctor.findOne({email: req.body.email, otp: req.body.otp, otpExpiresIn: { $gt: Date.now() }});
        } else if(req.body.user == "patient") {
            user = await Patient.findOne({email: req.body.email, otp: req.body.otp, otpExpiresIn: { $gt: Date.now() }});
        } else {
            return res.status(500).json({
                success: false,
                message: "User type is required",
            })
        }
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist / Invalid OTP",
            })
        }   

        const payload = {
            user: {
              id: user.id,
              type: req.body.user
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1 year' },
            async (err, token) => {
              if (err) throw err;
              user.otp = undefined;
              user.otpExpiresIn = undefined;
              await user.save();
              res.status(200).json({
                success: true,
                message: "Login successfull",
                token
              });
            }
        );
        
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}