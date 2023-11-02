"use client";
import * as Toast from "@radix-ui/react-toast";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { UserLogout } from "../actions/actions";

type LogoutButtonProps = {
  id: string;
};

const LogoutButton = ({ id }: LogoutButtonProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [toastContent, setToastContent] = useState({
    title: "",
    description: "",
  });
  const timerRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleLogout = async (id: string) => {
    try {
      const res = await UserLogout(id);
      console.log(res);
      setToastContent({
        title: "Success!",
        description: "You have successfully logged out.",
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
      setToastContent({
        title: "Error!",
        description: "Failed to log out. Please try again.",
      });
      setOpen(true);
    }
    // Automatically close the Toast after 2 seconds
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setOpen(false);
      router.refresh();
    }, 2000) as unknown as number;
  };

  return (
    <>
      <Button onClick={() => handleLogout(id)}>Logout</Button>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="fixed bottom-5 right-5 bg-white rounded-md shadow-lg p-4 animate-slide-in"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="font-bold  text-black">
            {toastContent.title}
          </Toast.Title>
          <Toast.Description className="text-sm text-black">
            {toastContent.description}
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>

      <style jsx>{`
        @keyframes slide-in {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default LogoutButton;
