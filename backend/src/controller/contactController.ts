import { Request,Response } from "express";
import Contact from "../model/Contact";
import Message from "../model/Message";
import { getOtp } from "../service/getOtp";


export const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contacts" });
    }
};

export const getContact = async (req: Request, res: Response) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (contact) {
       
            const messages = await Message.find({ contactId: contact._id }).sort({ createdAt: -1 });
            res.json({ contact, messages });
        } else {
            res.status(404).json({ message: "Contact not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching contact" });
    }
};

export const sendOtp = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;

    try {
        const contact = await Contact.findById(id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
 
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const messageText = `${text} Hi. Your OTP is: ${otp}`;
        
        await getOtp(contact.phoneNumber, messageText);
       
        
         
        
        const message = new Message({
            contactId: contact._id,
            otp: otp,
            message: messageText
        });
        await message.save();

   
        res.json({ message: "OTP sent successfully", otp,text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending OTP" });
    }
};


 