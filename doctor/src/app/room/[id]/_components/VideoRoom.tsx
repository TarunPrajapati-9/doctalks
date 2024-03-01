"use client";

import AgoraRTC, {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID ?? "";
const APP_TOKEN = process.env.NEXT_PUBLIC_AGORA_APP_TOKEN ?? "";
const channel = "doctalks";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoRoom = () => {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [localTracks, setLocalTracks] =
    useState<[IMicrophoneAudioTrack, ICameraVideoTrack]>();
  async function handleUserJoined(
    user: IAgoraRTCRemoteUser,
    mediaType: "audio" | "video" | "datachannel"
  ) {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      setUsers((prev) => [...prev, user]);
    }
    if (mediaType === "audio") {
      user.audioTrack?.play();
    }
  }
  function handleUserLeft(users: IAgoraRTCRemoteUser) {
    setUsers((prev) => prev.filter((user) => user.uid !== users.uid));
  }
  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);
    if (client.connectionState === "DISCONNECTED") {
      client
        .join(APP_ID, channel, APP_TOKEN, null)
        .then((uid) =>
          Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
        )
        .then(([tracks, uid]) => {
          setLocalTracks(tracks);
          const [audioTrack, videoTrack] = tracks;
          setUsers((prev) => [
            ...prev,
            { uid, videoTrack, audioTrack, hasAudio: true, hasVideo: true },
          ]);
          client.publish(tracks);
        });
    }

    // return () => {
    //   for (let track of localTracks ?? []) {
    //     track.stop();
    //     track.close();
    //   }
    //   client.off("user-published", handleUserJoined);
    //   client.off("user-left", handleUserLeft);
    //   client.unpublish(localTracks).then(() => client.leave());
    // };
  }, [localTracks]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-5">
        {users.map((user, index) => (
          <VideoPlayer
            user={user}
            key={user.uid + index + "WEB_CAM_AGORA_RTC"}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoRoom;
