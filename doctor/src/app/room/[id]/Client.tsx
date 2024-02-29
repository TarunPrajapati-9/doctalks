"use client";

import AgoraRTC, {
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteUsers,
  useClientEvent,
  AgoraRTCProvider,
} from "agora-rtc-react";
import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  doctor_id: string;
  doctor_name: string;
};

const Client = ({ doctor_id, doctor_name, id }: Props) => {
  const [joined, setJoined] = useState(false);
  //   const agoraEngine = useRTCClient(
  //     AgoraRTC.createClient({ codec: "vp8", mode: config.selectedProduct })
  //   );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <div>{/* TODO */}</div>;
};

export default Client;
