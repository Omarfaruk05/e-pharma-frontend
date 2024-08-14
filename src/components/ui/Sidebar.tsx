import Link from "next/link";

const Sidebar = () => {
  return (
    <div className=" w-full p-3 space-y-1 ">
      <Link
        className="rounded-md hover:bg-lime-400 flex p-2 justify-between w-full"
        href={"#"}
      >
        <span>OTC Medicine</span> <span>f</span>
      </Link>
    </div>
  );
};

export default Sidebar;
