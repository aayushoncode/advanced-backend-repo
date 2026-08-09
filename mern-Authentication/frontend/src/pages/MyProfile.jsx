import React, { useState } from "react";
import { User, Mail, Camera, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MyProfile = () => {
  // Dummy state (Replace this with your context/API data)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    initials: "JD",
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("Saving profile info...");
    // Add API call here
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    console.log("Updating password...");
    // Add API call here
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Account Settings
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your profile information and security preferences.
          </p>
        </div>

        {/* Tabs for Organization */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* ================= GENERAL TAB ================= */}
          <TabsContent value="general">
            <Card>
              <form onSubmit={handleSaveProfile}>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your photo and personal details here.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Profile Picture Section */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-2 border-gray-100 shadow-sm">
                      {/* Add actual src here if user has a profile pic */}
                      <AvatarImage src="" alt="Profile picture" />
                      <AvatarFallback className="text-2xl bg-indigo-50 text-indigo-700">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex gap-2"
                      >
                        <Camera className="h-4 w-4" />
                        Change Picture
                      </Button>
                      <p className="text-xs text-gray-500">
                        JPG, GIF or PNG. Max size of 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" /> Full Name
                      </Label>
                      <Input
                        id="name"
                        value={user.name}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 text-gray-500" /> Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        disabled
                        className="bg-gray-50 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500">
                        Email addresses cannot be changed once registered.
                      </p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="border-t px-6 py-4 bg-gray-50/50 rounded-b-xl">
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* ================= SECURITY TAB ================= */}
          <TabsContent value="security">
            <Card>
              <form onSubmit={handleUpdatePassword}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-gray-700" /> Security
                    Settings
                  </CardTitle>
                  <CardDescription>
                    Ensure your account is using a long, random password to stay
                    secure.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" required />
                  </div>
                </CardContent>

                <CardFooter className="border-t px-6 py-4 bg-gray-50/50 rounded-b-xl flex gap-3">
                  <Button type="submit" className="flex items-center gap-2">
                    <Key className="h-4 w-4" /> Update Password
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyProfile;
