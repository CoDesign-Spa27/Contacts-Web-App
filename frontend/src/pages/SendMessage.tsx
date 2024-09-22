import Navbar from "@/components/Navbar";
import { TiMessageTyping } from "react-icons/ti";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useParams } from "react-router-dom";
import { Contact } from "@/service/apiService";
import { toast } from "@/hooks/use-toast";
 

const SendMessage = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [contact, setContact] = useState<Contact | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post(`/${id}/send-otp`, {
        text: message,
      });
      if (response.data) {
        setMessage(""); 
        toast({
          title: "Success!",
          description: "OTP sent successfully.",
       
          duration: 3000,  
        });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Server Error or Number is not Invalid.",
      
        duration: 3000,  
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const response = await axiosInstance.get(`/${id}`);
      setContact(response.data.contact);
    } catch (error) {
      console.error("Failed to fetch contact details", error);
    }
  };

  return (
    <div className="bg-neutral-900 w-full h-screen">
      <Navbar />

      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl leading-10 text-gray-100 font-bold sm:text-3xl">
            Send OTP With Your Desired Message to {contact?.firstName}{" "}
            {contact?.lastName}
          </h1>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <div className="relative">
              <textarea
                rows={4}
                onChange={(e) => setMessage(e.target.value)}
                value={message}  
                className="w-full rounded-lg text-gray-100 bg-neutral-800 p-4 pr-12 text-sm shadow-sm focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter Message"
              />
              <span className="absolute inset-y-0 right-4 grid place-content-center px-4">
                <TiMessageTyping className="text-gray-100" />
              </span>
            </div>
          </div>

          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-100 text-sm">Write your message.</p>
            <motion.button
              type="submit"
              className="inline-block rounded-lg bg-pink-500 px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-pink-400 focus:ring-4 focus:ring-pink-300 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default SendMessage;
