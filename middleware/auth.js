const jwt = require("jsonwebtoken");

const Patient  = require('../models/Patient');
const Doctor = require('../models/Doctor');

module.exports.authorize = (role = "") => {

  return (req, res, next) => {
    try{
        if (req.headers.authorization) {
          const token = req.headers.authorization.split(" ")[1];
          jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
              return res.status(401).json({
                success: false,
                message: "Auth failed4",
                data: err.message,
              });
            }

            if(role == "patient") {
              const isValid = await Patient.findById(decoded.user.id);
              if (!isValid || !(decoded.user.type == "patient")) {
                return res.status(401).json({
                  success: false,
                  message: "Auth failed",
                  data: null,
                });
              }
              const userDetail = await Patient.findById(decoded.user.id).select(
                ["-password", "-observations" ]
              );
              req.user = userDetail;
              req.user.type = decoded.user.type
              next();
            } else if( role == "doctor") {
              const isValid = await Doctor.findById(decoded.user.id);
              if (!isValid || !(decoded.user.type == "doctor")) {
                return res.status(401).json({
                  success: false,
                  message: "Auth failed",
                  data: null,
                });
              }
        
              const userDetail = await Doctor.findById(decoded.user.id).select(
                ["-password", "-observations" ]
              );
              req.user = userDetail;
              req.user.type = decoded.user.type
              next();
            } else if(role == "admin") {
                if (!(decoded.user.type == "admin")) {
                  return res.status(401).json({
                    success: false,
                    message: "Auth failed",
                    data: null,
                  });
                }
                req.user = { id: "admin" };
                req.user.type = decoded.user.type
                next();
            } else {
              if(decoded.user.type == "patient") {
                const isValid = await Patient.findById(decoded.user.id);
                if (!isValid || !(decoded.user.type == "patient")) {
                  return res.status(401).json({
                    success: false,
                    message: "Auth failed",
                    data: null,
                  });
                }
                const userDetail = await Patient.findById(decoded.user.id).select(
                  ["-password", "-observations" ]
                );
                req.user = userDetail;
                req.user.type = decoded.user.type
                next();
              } else if( decoded.user.type == "doctor") {
                const isValid = await Doctor.findById(decoded.user.id);
                if (!isValid || !(decoded.user.type == "doctor")) {
                  return res.status(401).json({
                    success: false,
                    message: "Auth failed",
                    data: null,
                  });
                }
          
                const userDetail = await Doctor.findById(decoded.user.id).select(
                  ["-password", "-observations" ]
                );
                req.user = userDetail;
                req.user.type = decoded.user.type
                next();
              }
            }
        ``})
        } else {
          return res.status(401).json({
            success: false,
            message: "cant get jwt",
            data: null,
          });
        }
      }catch{
        return res.status(401).json({
          success: false,
          message: "Auth failed",
          data: null,
        });
      }
  }
};