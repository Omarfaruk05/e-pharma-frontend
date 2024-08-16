import Link from "next/link";
import MainContainer from "../layout/MainContainer";
import playStore from "../../assects/get-play-store-icon.webp";
import payment from "../../assects/payment.png";
import Image from "next/image";
import { MdEmail, MdContactPhone } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <MainContainer>
        <div className="p-4 md:p-12 grid grid-cols-1 md:grid-cols-5 gap-2">
          <div className="md:col-span-2 text-md font-semibold flex flex-col gap-6">
            <h2 className="text-3xl font-bold">E Pharma</h2>
            <Link className="hover:text-sky-400" href={"#"}>
              About us
            </Link>
            <Link className="hover:text-sky-400" href={"#"}>
              Terms & Conditions
            </Link>
            <Link className="hover:text-sky-400" href={"#"}>
              Privacy Policy
            </Link>
            <Link className="hover:text-sky-400" href={"#"}>
              Contact us
            </Link>
            <Link className="hover:text-sky-400" href={"#"}>
              Career
            </Link>
            <div className="p-3 bg-sky-400 rounded-xl w-fit space-y-4">
              <p>For Patient</p>
              <Image className="w-48" src={playStore} alt="play-store" />
            </div>
          </div>
          <div className="md:col-span-3 space-y-12">
            <div className="flex flex-col md:flex-row  gap-8">
              <div className="space-y-4">
                <div>
                  <MdEmail size={32} className="text-sky-400" />
                  <p>Email: support@epharma.health</p>
                </div>
                <div>
                  <MdContactPhone size={32} className="text-sky-400" />
                  <p>Contact: 01567900262</p>
                </div>
              </div>
              <div className="space-y-2">
                <FaAddressBook size={32} className="text-sky-400" />
                <p>
                  Level: 3, Road: 14, Block: C 180/6, Abdullah Park, 23/C
                  Banasree Main Rd, Dhaka-1219
                </p>
                <p>Trade License: TRAD/DNCC/131766/2022</p>
              </div>
            </div>
            <div>
              <Image
                className="rounded-xl h-60"
                src={payment}
                alt="payment_photo"
              />
            </div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Footer;
