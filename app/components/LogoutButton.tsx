"use client";
import { Button } from "@radix-ui/themes";
import { UserLogout } from "../actions/actions";
type LogoutButtonProps = {
  id: string;
};

const LogoutButton = ({ id }: LogoutButtonProps) => {
  const handleLogout = async (id: string) => {
    try {
      const res = await UserLogout(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={() => handleLogout(id)}>Logout</Button>;
};

export default LogoutButton;
