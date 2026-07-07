const prisma = require("../config/prisma");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
console.log(process.env.JWT_SECRET);

// ==========================
// Register User
// ==========================

const register = async (
    name,
    email,
    password
) => {

    // ==========================
    // Validasi Input
    // ==========================

    if (!name || !email || !password) {
        throw new Error(
            "Name, email, and password are required."
        );
    }

    // ==========================
    // Cek Email
    // ==========================

    const existingUser =
        await prisma.user.findUnique({

            where: {

                email,

            },

        });

    if (existingUser) {
        throw new Error(
            "Email already registered."
        );
    }

    // ==========================
    // Hash Password
    // ==========================

    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

    // ==========================
    // Simpan User
    // ==========================

    const user =
        await prisma.user.create({

            data: {

                name,

                email,

                password:
                    hashedPassword,

            },

            select: {

                id: true,

                name: true,

                email: true,

                createdAt: true,

            },

        });

    return user;

};

// ==========================
// Login User
// ==========================

const login = async (
    email,
    password
) => {

    // ==========================
    // Validasi Input
    // ==========================

    if (!email || !password) {
        throw new Error(
            "Email and password are required."
        );
    }

    // ==========================
    // Cari User
    // ==========================

    const user =
        await prisma.user.findUnique({

            where: {

                email,

            },

        });

    if (!user) {
        throw new Error(
            "Invalid email or password."
        );
    }

    // ==========================
    // Verifikasi Password
    // ==========================

    const isPasswordValid =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordValid) {
        throw new Error(
            "Invalid email or password."
        );
    }

    // ==========================
    // Generate JWT Token
    // ==========================

    const token =
        jwt.sign(

            {

                id: user.id,

                email: user.email,

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d",

            }

        );

    // ==========================
    // Return Result
    // ==========================

    return {

        token,

        user: {

            id: user.id,

            name: user.name,

            email: user.email,

        },

    };

};

module.exports = {

    register,

    login,

};