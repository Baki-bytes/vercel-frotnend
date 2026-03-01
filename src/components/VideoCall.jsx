import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";

const VideoCall = () => {
  const meetingRef = useRef(null);
  const { roomId } = useParams();
  const { user } = ChatState();

  useEffect(() => {
    if (!meetingRef.current || !user || !roomId) return;

    // ⚠️ FOR TESTING ONLY — move token generation to backend for production
    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,        // roomID
      user._id,      // userID (must be unique)
      user.name      // userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: meetingRef.current,

      // Scenario
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },

      // Join behavior (Teams-like defaults)
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,

      // Control buttons
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,

      // Modules
      showTextChat: false,
      showUserList: true,

      // Layout
      layout: "Auto",
      showLayoutButton: false,

      // Limits
      maxUsers: 2,
    });

    return () => {
      zp.destroy();
    };
  }, [roomId, user]);

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
