"use client";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  doctor_id: string;
  doctor_name: string;
};

const Client = ({ doctor_id, doctor_name, id }: Props) => {
  const [mounted, setMounted] = useState(false);
  const meet = async (element: any) => {
    const appId = process.env.ZEGO_APP_ID ?? "";
    const serviceSecret = process.env.ZEGO_SERVICE_SECRET ?? "";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(appId),
      serviceSecret,
      id,
      doctor_id,
      doctor_name
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    if (zc) {
      zc.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        sharedLinks: [
          {
            name: "Copy link",
            url: `http://localhost:3000/room/${id}`,
          },
        ],
      });
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div>
      <div className="h-screen w-screen" ref={meet} />
    </div>
  );
};

export default Client;
