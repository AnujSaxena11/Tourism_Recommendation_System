const Joi = require("joi");

const email = Joi.string()
        .email({minDomainSegments: 2})
        .trim()
        .lowercase()
        .max(254)
        .required()
        .messages({
            'string.email': 'Enter a valid email address',
            'string.empty': 'Email is required',
        });

const newPassword = Joi.string()
        .min(12)
        .max(72)
        .custom((value, helpers) => Buffer.byteLength(value, "utf8") <= 72
            ? value
            : helpers.error("string.max"))
        .required()
        .messages({
            'string.min': 'Password must be at least 12 characters long',
            'string.max': "Password cannot exceed bcrypt's 72-byte limit",
            'string.empty': 'Password is required'
        });

const loginPassword = Joi.string()
        .min(1)
        .max(72)
        .custom((value, helpers) => Buffer.byteLength(value, "utf8") <= 72
            ? value
            : helpers.error("string.max"))
        .required();

const cpassword = Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match',
            'string.empty': 'Confirm password is required'
        });

const cnewPassword = Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
            'any.only': 'Passwords do not match',
            'string.empty': 'Confirm password is required'
        });

const otp = Joi.string()
    .length(6)
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
        'string.length': 'OTP must be 6 digits',
        'string.empty': 'OTP is required',
        'string.pattern.base': 'OTP must contain only digits'
    });        

const signUpSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be atleast 2 characters long',
            'string.max': 'Name cannot excess 100 characters',
        }),
    email,
    password: newPassword,
    cpassword
});

const loginSchema = Joi.object({
    email,
    password: loginPassword
});

const forgetPasswordSchema = Joi.object({
    email,
});

const verifyOTPSchema = Joi.object({
    email,
    otp,
    newPassword,
    cnewPassword
});

module.exports = {
    signUpSchema,
    loginSchema,
    forgetPasswordSchema,
    verifyOTPSchema
}