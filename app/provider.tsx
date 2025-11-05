import React, { useContext, useEffect, useState } from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { UserDetailContext } from "@/context/userDetailContext";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CreateUser = useMutation(api.user.CreateNewUser);
  const { user } = useUser();

  const [userDetail, setUserDetail] = useState<any>();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    if (user) {
      {
        const result = await CreateUser({
          name: user?.fullName ?? "",
          imageurl: user?.imageUrl,
          email: user?.primaryEmailAddress?.emailAddress ?? "",
        });
        setUserDetail(result);
      }
    }
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>
        <Header />
        {children}
      </div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};
