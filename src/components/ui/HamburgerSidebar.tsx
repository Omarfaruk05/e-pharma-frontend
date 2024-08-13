import { IoCloseCircleOutline } from "react-icons/io5";
import Sidebar from "./Sidebar";

const HamburgerSidebar = ({ isOpen, closeSidebar }: any) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white z-50 transform text-black ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out w-60`}
    >
      <div>
        <div className="flex justify-between text-sky-400 p-4">
          <div>
            <h2 className="text-2xl font-semibold">E Pharma</h2>
          </div>
          <button onClick={closeSidebar}>
            <IoCloseCircleOutline size={32} />
          </button>
        </div>
        <hr />
        {/* Add your menu items here */}
        <div className="p-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default HamburgerSidebar;
