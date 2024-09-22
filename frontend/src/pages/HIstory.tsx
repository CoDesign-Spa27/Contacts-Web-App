import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { Loading } from '@/components/Loading';
import Navbar from "@/components/Navbar";

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Message {
  _id: string;
  otp: string;
  message: string;
  createdAt: string;
}
const History: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contactName, setContactName] = useState<string>("");
 
  useEffect(() => {
    setLoading(true);
    const fetchContacts = async () => {
      try {
        const response = await axiosInstance.get("/");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const fetchMessages = async (contactId: string) => {
    try {
      const response = await axiosInstance.get(`/${contactId}`);
      setMessages(response.data.messages);
      setContactName(
        `${response.data.contact.firstName} ${response.data.contact.lastName}`
      );
      setSelectedContact(contactId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

 
  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <div className="bg-neutral-900 flex flex-col ">
        <Navbar />

        <div className="flex flex-col md:flex-row w-full h-full">
       
          <div className="w-full md:w-1/4 shadow-xl p-4 overflow-y-auto bg-neutral-900 md:bg-neutral-900">
            <h2 className="text-xl font-semibold mb-4 text-neutral-100 md:text-neutral-100">
              Contacts
            </h2>
            {contacts.length > 0 ? (
              contacts.map((contact, i) => (
                <motion.div
                  key={contact._id}
                  className={
                    selectedContact === contact._id
                      ? "cursor-pointer p-4 bg-white shadow-lg rounded-full mb-3 hover:bg-blue-50 transition duration-300 border-l-8 border-pink-500"
                      : " my-3 p-4 flex text-white bg-white items-center rounded-full cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-pink-600 before:to-pink-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                  }
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => fetchMessages(contact._id)}
                >
                  <p className="text-gray-800 font-medium">
                    {contact.firstName} {contact.lastName}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No contacts available.</p>
            )}
          </div>

     
          <div className="w-full md:w-3/4 bg-neutral-900 p-6 flex-grow">
            {selectedContact ? (
              <>
                <motion.h2
                  className="text-2xl font-bold mb-4 text-neutral-100"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                >
                  {contactName}'s Messages
                </motion.h2>
                <hr className="py-3 " />
                <div className="overflow-y-auto h-full space-y-4">
                  {messages.length > 0 ? (
                    messages.map((message, index) => (
                      <motion.div
                        key={message._id}
                        className="p-4 bg-gray-200 rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          transition: { duration: 0.3, delay: index * 0.1 },
                        }}
                      >
                        <p className="font-semibold text-gray-900">
                          OTP: {message.otp}
                        </p>
                        <p className="text-gray-700 font-medium">{message.message}</p>
                        <p className="text-sm text-gray-500">
                         Date: {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      className="text-neutral-100 text-center text-lg"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.5 },
                      }}
                    >
                      No messages available.
                    </motion.p>
                  )}
                </div>
              </>
            ) : (
              <motion.p
                className="text-neutral-100 text-center text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
              >
                Please select a contact to view their messages.
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
