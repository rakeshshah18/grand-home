import User from '../../models/auth/user.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });
};

const authController = {
    // @desc    Register new user & Send OTP
    // @route   POST /api/auth/register
    register: async (req, res) => {
        try {
            const { username, email, password, mobile } = req.body;

            const userExists = await User.findOne({ $or: [{ email }, { username }, { mobile }] });
            if (userExists) {
                return res.status(400).json({ success: false, message: 'User already exists' });
            }

            // Generate 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

            const user = await User.create({
                username,
                email,
                password,
                mobile,
                otp,
                otpExpires
            });

            if (user) {
                // MOCK OTP SENDING: Log to console
                console.log(`\n--- [MOCK OTP SERVICE] ---`);
                console.log(`TO: ${mobile}`);
                console.log(`CODE: ${otp}`);
                console.log(`--------------------------\n`);

                res.status(201).json({
                    success: true,
                    message: 'Registration successful. OTP sent to your mobile number.',
                    data: {
                        id: user._id,
                        username: user.username,
                        mobile: user.mobile
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // @desc    Verify OTP
    // @route   POST /api/auth/verify-otp
    verifyOtp: async (req, res) => {
        try {
            const { mobile, otp } = req.body;

            const user = await User.findOne({ mobile }).select('+otp +otpExpires');

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            if (user.otp !== otp || user.otpExpires < Date.now()) {
                return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
            }

            user.isVerified = true;
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();

            res.status(200).json({
                success: true,
                message: 'Mobile number verified successfully',
                token: generateToken(user._id)
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // @desc    Authenticate user & get token
    // @route   POST /api/auth/login
    login: async (req, res) => {
        try {
            const { identifier, password } = req.body; // identifier can be email, username or mobile

            const user = await User.findOne({
                $or: [{ email: identifier }, { username: identifier }, { mobile: identifier }]
            }).select('+password');

            if (user && (await user.comparePassword(password))) {
                if (!user.isVerified) {
                    return res.status(401).json({ success: false, message: 'Please verify your mobile number first' });
                }

                res.json({
                    success: true,
                    data: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        mobile: user.mobile,
                        token: generateToken(user._id)
                    }
                });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // @desc    Get user profile
    // @route   GET /api/auth/profile
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            if (user) {
                res.json({
                    success: true,
                    data: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        mobile: user.mobile
                    }
                });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

export default authController;
