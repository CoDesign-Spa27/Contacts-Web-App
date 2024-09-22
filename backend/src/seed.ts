import mongoose from 'mongoose';
import Contact from './model/Contact';
import dotenv from 'dotenv';

dotenv.config();
const contacts = [
  { firstName: 'Sandeep', lastName: 'Singh', phoneNumber: '+918290833651' },
  { firstName: 'Ram', lastName: 'Sharma', phoneNumber: '+9876543210' },
  { firstName: 'Data', lastName: 'Tasker', phoneNumber: '+919810153260' },
  { firstName: 'Jay', lastName: 'Agagwasl', phoneNumber: '+918957385935' },
  { firstName: 'Rahul', lastName: 'Pareek', phoneNumber: '+91758395643' },
];

const seedContacts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log('Connected to MongoDB');

 
    for (const contact of contacts) {
      
      const existingContact = await Contact.findOne({ phoneNumber: contact.phoneNumber });

      if (!existingContact) {
    
        await Contact.create(contact);
        console.log(`Inserted contact: ${contact.firstName} ${contact.lastName}`);
      } else {
        console.log(`Contact already exists: ${contact.firstName} ${contact.lastName}`);
      }
    }

    console.log('Seeding completed');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding contacts:', error);
  }
};

seedContacts();
