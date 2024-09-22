"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = exports.getContact = exports.getContacts = void 0;
const Contact_1 = __importDefault(require("../model/Contact"));
const Message_1 = __importDefault(require("../model/Message"));
const getOtp_1 = require("../service/getOtp");
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact_1.default.find();
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching contacts" });
    }
};
exports.getContacts = getContacts;
const getContact = async (req, res) => {
    try {
        const contact = await Contact_1.default.findById(req.params.id);
        if (contact) {
            const messages = await Message_1.default.find({ contactId: contact._id }).sort({ createdAt: -1 });
            res.json({ contact, messages });
        }
        else {
            res.status(404).json({ message: "Contact not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching contact" });
    }
};
exports.getContact = getContact;
const sendOtp = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const contact = await Contact_1.default.findById(id);
        if (!contact)
            return res.status(404).json({ message: "Contact not found" });
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const messageText = `${text} Hi. Your OTP is: ${otp}`;
        await (0, getOtp_1.getOtp)(contact.phoneNumber, messageText);
        const message = new Message_1.default({
            contactId: contact._id,
            otp: otp,
            message: messageText
        });
        await message.save();
        res.json({ message: "OTP sent successfully", otp });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending OTP" });
    }
};
exports.sendOtp = sendOtp;
