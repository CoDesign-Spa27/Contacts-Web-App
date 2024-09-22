import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import SquishyCard from '@/components/ContactDetailCard';
import { getContact } from '@/service/apiService';
import { Loading } from '@/components/Loading';

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [contact, setContact] = useState<Contact | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  

 
  
  useEffect(() => {
     const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await getContact(id);
        setContact(response);
      } catch (error) {
        setError('Failed to load contact');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id]);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='w-full h-screen flex text-gray-100 text-center items-center justify-center bg-neutral-900'
      >
        {error}
      </motion.div>
    );
  }

  return (
    <>
      <div className='w-full bg-neutral-900'>
        <Navbar />
        {!contact ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-full h-screen flex text-gray-100 text-center items-center justify-center bg-neutral-900'
          >
            Contact not found.
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='w-full py-20 px-20'
          >
            <SquishyCard contact={contact} />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ContactDetail;


