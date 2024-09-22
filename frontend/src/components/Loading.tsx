import { motion } from "framer-motion"

export const Loading=()=>{
    return (
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-full h-screen flex text-center items-center justify-center bg-neutral-900'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex-col gap-4 w-full flex items-center justify-center"
            >
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
    )
    }