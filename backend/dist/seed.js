"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Contact_1 = __importDefault(require("./model/Contact"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const contacts = [
    { firstName: 'Sandeep', lastName: 'Singh', phoneNumber: '+918290833651' },
    { firstName: 'Ram', lastName: 'Sharma', phoneNumber: '+9876543210' },
    { firstName: 'Data', lastName: 'Tasker', phoneNumber: '+919810153260' },
    { firstName: 'Jay', lastName: 'Agagwasl', phoneNumber: '+918957385935' },
    { firstName: 'Rahul', lastName: 'Pareek', phoneNumber: '+91758395643' },
];
const seedContacts = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        for (const contact of contacts) {
            const existingContact = await Contact_1.default.findOne({ phoneNumber: contact.phoneNumber });
            if (!existingContact) {
                await Contact_1.default.create(contact);
                console.log(`Inserted contact: ${contact.firstName} ${contact.lastName}`);
            }
            else {
                console.log(`Contact already exists: ${contact.firstName} ${contact.lastName}`);
            }
        }
        console.log('Seeding completed');
        mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding contacts:', error);
    }
};
seedContacts();
