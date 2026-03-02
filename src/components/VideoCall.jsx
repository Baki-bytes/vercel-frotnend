import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";

const VideoCall = () => {
  const meetingRef = useRef(null);
  const { roomId } = useParams();
  const { user } = ChatState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!meetingRef.current || !user || !roomId) return;

    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
    const userId = String(user._id || "");
    const userName = String(user.name || "Guest");

    if (!Number.isFinite(appID) || appID <= 0 || !serverSecret) {
      setError("Video call config missing. Please set Zego env variables.");
      return;
    }

    if (!userId) {
      setError("Invalid user session. Please login again.");
      return;
    }

    setError("");

    let zegoInstance;

    try {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userId,
        userName
      );

      zegoInstance = ZegoUIKitPrebuilt.create(kitToken);

      zegoInstance.joinRoom({
        container: meetingRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
        turnOnMicrophoneWhenJoining: false,
        turnOnCameraWhenJoining: false,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTextChat: false,
        showUserList: true,
        layout: "Auto",
        showLayoutButton: false,
        maxUsers: 2,
      });
    } catch (err) {
      setError(err?.message || "Failed to start video call.");
    }

    return () => {
      zegoInstance?.destroy();
    };
  }, [roomId, user]);

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111",
          color: "#fff",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      ref={meetingRef}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#000",
      }}
    />
  );
};

export default VideoCall;
