"use client";
import { Button } from "@radix-ui/themes";
type LogoutButtonProps = {
  handleLogout: (id: string) => void;
  id: string;
};

const LogoutButton = ({ handleLogout, id }: LogoutButtonProps) => {
  return <Button onClick={() => handleLogout(id)}>Logout</Button>;
};

export default LogoutButton;
