// components/ui/MobileNav.js
import { IoBagOutline, IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CgMenuLeft } from "react-icons/cg";

const MobileNav = ({ toggleSidebar }: any) => {
  return (
    <div className="flex justify-between items-center p-2 bg-white md:hidden">
      <div onClick={toggleSidebar}>
        <CgMenuLeft size={32} />
      </div>
      <div>
        <IoHomeOutline size={32} />
      </div>
      <div>
        <IoBagOutline size={32} />
      </div>
      <div>
        <CiUser size={32} />
      </div>
    </div>
  );
};

export default MobileNav;
