"use client";

import { useEffect, useState } from "react";
import VideoRoom from "./VideoRoom";

type Props = {
  id: string;
  doctor_id: string;
  doctor_name: string;
};

const Client = ({ doctor_id, doctor_name, id }: Props) => {
  const [room, setRoom] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold">Create your room</h1>
        {!room && (
          <button
            className="btn"
            onClick={() => {
              setRoom(true);
            }}
          >
            Join
          </button>
        )}
        {room && <VideoRoom />}
      </div>
    </div>
  );
};

export default Client;
