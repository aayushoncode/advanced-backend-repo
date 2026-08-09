import React from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CloudSavingDone01FreeIcons } from "@hugeicons/core-free-icons";

const Loading = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex gap-2 ">
          <Button className="bg-black text-white" variant="outline" disabled>
            <Spinner className="text-white" data-icon="inline-start" />
            Loading...
          </Button>
        </div>
      </div>
    </>
  );
};

export default Loading;
