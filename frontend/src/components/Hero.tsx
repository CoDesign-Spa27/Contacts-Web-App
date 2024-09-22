import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import HeroJson from "../assets/Hero.json";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full h-screen px-8 py-32 grid grid-cols-1 md:grid-cols-2 items-center gap-40 max-w-6xl mx-auto">
     
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, x: -100 }}  
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}  
      >
        <motion.span
          className="block mb-4 text-xs md:text-sm text-pink-500 font-medium"
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.6 }} 
        >
          Better every day
        </motion.span>

        <motion.h3
          className="text-4xl text-white md:text-6xl font-semibold"
          initial={{ opacity: 0, x: -20 }}  
          animate={{ opacity: 1, x: 0 }}  
          transition={{ delay: 0.6, duration: 0.8 }}  
        >
          Let's change it up a bit
        </motion.h3>

        <motion.p
          className="text-base md:text-lg text-white my-4 md:my-6"
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }}  
          transition={{ delay: 0.8, duration: 0.6 }}  
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
          error repellat voluptatibus ad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          transition={{ delay: 1, duration: 0.6 }} 
        >
          <Link to={"contacts"}>
            <motion.button
              whileHover={{ scale: 1.05 }}  
              whileTap={{ scale: 0.95 }} 
              className="bg-pink-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-pink-600"
            >
              Send OTP
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

       
      <motion.div
        className="md:block hidden"
        initial={{ opacity: 0, scale: 0.8 }}  
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 1.2, duration: 0.8 }}  
      >
        <Lottie loop animationData={HeroJson} play style={{ width: 400, height: 400 }} />
      </motion.div>
    </section>
  );
};

export default Hero;
