import { useState } from "react";
import VideoRoom from "./components/VideoRoom";

function App() {
  const [room, setRoom] = useState(false);

  return (
    <>
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
    </>
  );
}

export default App;
