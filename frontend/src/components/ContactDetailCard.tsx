import { motion } from "framer-motion";
import { ContactType } from "./ContactListCard";
import { useClipboard } from 'use-clipboard-copy';
import { FaCopy } from "react-icons/fa";
import { toast } from "@/hooks/use-toast"
import { Link } from "react-router-dom";

interface ContactDetailCardProps {
    contact: ContactType;
  }


const SquishyCard = ({contact}:ContactDetailCardProps) => {
  return (
    <section className="w-full  px-4 py-12">
      <div className="mx-auto w-fit">
        <Card contact={contact} />
      </div>
    </section>
  );
};

const Card = ({contact}:ContactDetailCardProps) => {

  const clipboard = useClipboard({
    onSuccess() {
      
      console.log('Text was copied successfully!')
    },
    onError() {
      console.log('Failed to copy text!')
    }
  });

  
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative h-96 w-80 shrink-0 overflow-hidden rounded-xl bg-pink-500 p-8"
    >
      <div className="relative z-10 text-white">
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="my-2 block origin-top-left font-mono text-6xl font-black leading-[1.2]"
        >
        {contact.firstName}
          <br />
       {contact.lastName}
       
        </motion.span>
        <div className="flex items-center gap-3">
          
        <p
        ref={clipboard.target}
        className="text-xl font-bold">
          {contact.phoneNumber}
        </p>
        <div onClick={() =>{ 
            toast({
              title: "Copied Successfully",
              description: "",
            }),
          clipboard.copy(contact.phoneNumber)}} className="text-white cursor-pointer text-xl">
        <FaCopy />
        </div>
          </div>
    
      </div>
      <Link to={`/contact/${contact._id}/send-otp`}>
      <button className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white">
     Send Message
      </button>
      </Link>
      <Background />
    </motion.div>
  );
};

const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};

export default SquishyCard;