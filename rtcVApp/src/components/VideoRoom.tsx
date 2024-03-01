/* eslint-disable @typescript-eslint/no-explicit-any */
import AgoraRTC, {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

const APP_ID = "942f3e5baf244ef3bec40da8091973b7";
const APP_TOKEN =
  "007eJxTYJg15UWIn5IY+6rENQ0fboRPvpXX+s9667OAR3Z+Utxn36gqMFiaGKUZp5omJaYZmZikphknpSabGKQkWhhYGlqaGyeZK+Q+TG0IZGSIatdgYWSAQBCfgyElP7kkMSe7mIEBAAWXIVw=";
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

    return () => {
      for (const track of localTracks ?? []) {
        track.stop();
        track.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, [localTracks]);

  return (
    <div>
      <div className="grid grid-cols-2">
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
