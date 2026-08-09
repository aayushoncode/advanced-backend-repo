import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppData } from "@/context/AppContext";

const Log_out = () => {
  const { logoutUser } = AppData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Add your actual logout logic here
    console.log("Logging out...");
    localStorage.clear();
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="max-w-sm w-full text-center shadow-sm">
        <CardHeader className="flex flex-col items-center gap-2 pt-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-2">
            <LogOut className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Sign Out</CardTitle>
          <CardDescription>
            Are you sure you want to sign out of your account? You will need to
            log back in to access your profile.
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex-col gap-3 pb-8">
          <Button variant="destructive" className="w-full" onClick={logoutUser}>
            Yes, sign out
          </Button>

          <Button variant="outline" className="w-full" onClick={handleCancel}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Log_out;
