import Lottie from 'react-lottie-player'
import HeroJson from '../assets/Hero.json'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="w-full h-screen px-8 py-32 grid grid-cols-1 md:grid-cols-2 items-center gap-40 max-w-6xl mx-auto">
      <div className='w-full h-full'>
        <span className="block mb-4 text-xs md:text-sm text-pink-500 font-medium">
          Better every day
        </span>
        <h3 className="text-4xl text-white md:text-6xl font-semibold">
          Let's change it up a bit
        </h3>
        <p className="text-base md:text-lg text-white my-4 md:my-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
          error repellat voluptatibus ad.
        </p>
        <Link to={"contacts"} >
        <button className="bg-pink-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-pink-600 active:scale-95">
        Send OTP
        </button>
        </Link>
      </div>
      <div className='md:block hidden'>

      <Lottie
      loop
      animationData={HeroJson}
      play
      style={{ width: 400, height: 400 }}
      />
      </div>
    </section>
  );
};
 
 

export default Hero;