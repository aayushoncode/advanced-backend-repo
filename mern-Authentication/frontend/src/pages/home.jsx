import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Activity,
  CreditCard,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  // Dummy user data (you would fetch this from your AppContext/API)
  const userName = "Developer";

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <LayoutDashboard className="h-6 w-6 text-indigo-600" />
          <span>MyApp</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button variant="outline" onClick={() => navigate("/logout")}>
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here is what's happening with your account today.
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Revenue
              </CardTitle>
              <CreditCard className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-green-600 font-medium mt-1">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-green-600 font-medium mt-1">
                +180 new users this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">
                System Health
              </CardTitle>
              <Activity className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-gray-500 mt-1">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section (e.g., Recent Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions and notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Dummy List Items */}
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center">
                        <Activity className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Project updated
                        </p>
                        <p className="text-xs text-gray-500">
                          You deployed a new version of the main application.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 flex items-center justify-center gap-2 text-indigo-600"
              >
                View All Activity <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
