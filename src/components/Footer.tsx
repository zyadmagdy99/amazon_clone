import Image from "next/image";
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <div >

    <div className=" w-full h-20 bg-amazon_light text-gray-300 flex items-center justify-center gap-4">
      <Image className="w-24" src={logo} alt="logo" />
      <p className="text-sm -mt-4">
        
        <a
          className="hover:text-white hover:underline decoration-[1px] cursor-pointer duration-300"
          href="https://my-portfolio1-beryl.vercel.app/"
          target="_blank"
        >
          By Zyad Magdy
        </a>
      </p>
    </div>
    </div>
  );
};

export default Footer;