const jwt = require("jsonwebtoken");

// ==========================
// Authentication Middleware
// ==========================

const authenticate = (req, res, next) => {

    try {

        // ==========================
        // Ambil Authorization Header
        // ==========================

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message: "Access token is required.",

            });

        }

        // ==========================
        // Format:
        // Bearer xxxxxxxxx
        // ==========================

        const token =
            authHeader.split(" ")[1];

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Invalid token format.",

            });

        }

        // ==========================
        // Verifikasi JWT
        // ==========================

        const decoded =
            jwt.verify(

                token,

                process.env.JWT_SECRET

            );

        // ==========================
        // Simpan Data User
        // ==========================

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid or expired token.",

        });

    }

};

module.exports = {

    authenticate,

};