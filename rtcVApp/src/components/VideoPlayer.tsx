import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { ElementRef, useEffect, useRef } from "react";

type Props = {
  user: IAgoraRTCRemoteUser;
};

const VideoPlayer = ({ user }: Props) => {
  const divRef = useRef<ElementRef<"div">>(null);
  useEffect(() => {
    user?.videoTrack?.play(divRef.current as HTMLElement);
  }, [user.videoTrack]);

  return (
    <div>
      <h1>Uid: {user.uid}</h1>
      <div ref={divRef} className="h-[200px] w-[200px]"></div>
    </div>
  );
};

export default VideoPlayer;
