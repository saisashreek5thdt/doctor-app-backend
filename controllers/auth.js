const Patient  = require('../models/Patient');

const jwt = require('jsonwebtoken');

var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_SECRET, domain: process.env.MAILGUN_DOMAIN });
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports.login = async (req, res) => {
    try {
        const patient = await Patient.findOne({email: req.body.email});
        if(!patient) {
            return res.status(401).json({
                success: false,
                message: "Patient not found",
            })
        }
        // console.log(patient)
        const otp = Math.floor(100000 + Math.random() * 900000); //6 digit integer otp

        patient.otp = otp;
        patient.otpExpiresIn = Date.now() + 3600000; // 1 hour
        await patient.save();

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

        var data = {
            from: 'Doctor App <info@iqcinternational.com>',
            to: "muhammednabeeltkanr@gmail.com",
            subject: 'Authentication Request for Doctor App',
            text: `Hello ${patient.name},\n`+
            `Your OTP for Login access is - ${otp}\n\n`+
            `Thanks,\n`+
            `Team KalpaVriksh`
        };
      
          await mailgun.messages().send(data).then(async (body) => {
              console.log("mail send",body);
              return res.status(200).json({
                success: true,
                message: "OTP had send to your mailid and phone number",
              })
          }).catch((err) => {
              console.log(err);
              return res.status(500).json({ success: false, message: "Mail sending error"});
          });
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
        const patient = await Patient.findOne({email: req.body.email, otp: req.body.otp, otpExpiresIn: { $gt: Date.now() }});
        if(!patient) {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP",
            })
        }   

        const payload = {
            user: {
              id: patient.id,
              type: "patient"
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1 year' },
            async (err, token) => {
              if (err) throw err;
              patient.otp = undefined;
              patient.otpExpiresIn = undefined;
              await patient.save();
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