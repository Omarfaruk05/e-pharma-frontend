"use client";

import ProcessingBtn from "@/components/loading/ProcessingBtn";
import MyInfo from "@/components/ui/MyInfo";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";

const MyProfile = () => {
  const { _id } = getUserInfo() as any;
  const { data, isLoading } = useGetSingleUserQuery(_id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen">
        <div className="w-fit">
          <ProcessingBtn />
        </div>
      </div>
    );
  }
  return <MyInfo data={data} />;
};

export default MyProfile;
