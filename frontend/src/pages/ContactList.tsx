import ContactListCard from '@/components/ContactListCard';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';  
import { getContacts } from '@/service/apiService';
import { Loading } from '@/components/Loading';
 
interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]); 
 const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    const fetchContacts = async () => {
      try {
        const response = await getContacts();
        setContacts(response);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch contacts", error);
      }finally{
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);
 
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  if(loading){
    return (
      <Loading />
    )
  }
  return (
    <>
    <div className='bg-neutral-900 w-full '>

      <Navbar />
      <div className="w-full max-w-4xl mx-auto p-4">
        <h1 className="text-2xl md:text-4xl py-5 text-center text-gray-100 mb-4 font-black">Contacts List</h1>
        <motion.div
          className="grid gap-4 grid-cols-1"
          initial="hidden"
          animate="visible"
          variants={listVariants}
          >
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <motion.div
              key={contact._id}
              variants={itemVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }} 
              >
                <ContactListCard contact={contact} />
              </motion.div>
            ))
          ) : (
            <p>No contacts found.</p>
          )}
        </motion.div>
      </div>
            </div>
    </>
  );
};

export default ContactList;
