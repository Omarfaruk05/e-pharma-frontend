import { BsFileEarmarkImage } from "react-icons/bs";
import { FcCalendar, FcVideoCall, FcCallback } from "react-icons/fc";

const Services = () => {
  return (
    <div className="text-white font-semibold text-2xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-between gap-4 py-8">
      <div className="bg-sky-600 p-8 rounded-lg w-full flex gap-4 items-center justify-center">
        <BsFileEarmarkImage className="text-orange-500" size={32} />
        <p>Upload Prescriptions</p>
      </div>
      <div className="bg-cyan-600 p-8 rounded-lg w-full flex gap-4 items-center justify-center">
        <FcCalendar size={32} />
        <p>Book Appointment</p>
      </div>
      <div className="bg-emerald-700 p-8 rounded-lg w-full flex gap-4 items-center justify-center">
        <FcVideoCall size={32} />
        <p>Video Consultation</p>
      </div>
      <div className="bg-teal-950 p-8 rounded-lg w-full flex gap-4 items-center justify-center">
        <FcCallback size={32} />
        <p>
          Order: <span className="text-blue-400">01567900262</span>
        </p>
      </div>
    </div>
  );
};

export default Services;
