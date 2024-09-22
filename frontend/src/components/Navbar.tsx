import { Link } from "react-router-dom";
import { DropDown } from "./Dropdown";
import Lottie from "react-lottie-player";
import Logo from "../assets/Logo.json";
const Navbar = () => {
  return (
    <nav>

    <div className="w-full bg-neutral-900 flex items-center justify-center text-white shadow-md z-10">
      <div className="w-full max-w-5xl flex items-center justify-between px-10">
        <Link to="/" className="flex gap-3  items-center">
        <a className="block md:flex md:items-center md:gap-6 text-purple-600">
                  <Lottie
                    loop
                    animationData={Logo}
                    play
                    style={{ width: 70, height: 70 }}
                    />
                  <span className="text-white md:block hidden font-bold text-xl">
               Contact Web App
                  </span>
                </a>
        </Link>
        <div>
          <DropDown />
        </div>
      </div>
    </div>
                    </nav>
  );
};

export default Navbar;
