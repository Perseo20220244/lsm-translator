import React from 'react';
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { Icon } from '@iconify/react';

export const LiveSession: React.FC = () => {
  const [isSessionActive, setIsSessionActive] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [cameraError, setCameraError] = React.useState<string | null>(null);
  const [stream, setStream] = React.useState<MediaStream | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Could not access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleStartSession = async () => {
    setIsSessionActive(true);
    await startCamera();
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    setIsRecording(false);
    stopCamera();
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Cleanup on component unmount
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Live Translation Session</h1>
          <div className="flex items-center space-x-2">
            <Icon icon={isSessionActive ? "lucide:video" : "lucide:video-off"} className={isSessionActive ? "text-success" : "text-danger"} />
            <span className={isSessionActive ? "text-success" : "text-danger"}>
              {isSessionActive ? "Connected" : "Disconnected"}
            </span>
          </div>
        </CardHeader>
        <CardBody>
          <div className="aspect-video bg-gray-200 mb-4 rounded-lg flex items-center justify-center relative overflow-hidden">
            {isSessionActive && !cameraError ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Icon icon="lucide:camera-off" className="text-4xl text-gray-400 mb-2" />
                {cameraError ? (
                  <p className="text-danger text-center text-sm px-4">{cameraError}</p>
                ) : (
                  <p className="text-gray-500 text-center">Camera feed will appear here</p>
                )}
              </div>
            )}
            {isRecording && isSessionActive && (
              <div className="absolute top-2 right-2 flex items-center space-x-2 bg-danger text-white px-2 py-1 rounded-full">
                <Icon icon="lucide:record-video" className="animate-pulse" />
                <span className="text-sm">Recording</span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Translated Text</h2>
              <p className="p-4 bg-content2 rounded-lg">
                {isSessionActive ? "The translated text will appear here in real-time." : "Start a session to begin translation."}
              </p>
            </div>
            <div className="flex space-x-2">
              {!isSessionActive ? (
                <Button color="success" onPress={handleStartSession}>
                  <Icon icon="lucide:play" className="mr-2" />
                  Start Session
                </Button>
              ) : (
                <>
                  <Button color="danger" onPress={handleEndSession}>
                    <Icon icon="lucide:stop" className="mr-2" />
                    End Session
                  </Button>
                  <Button
                    color={isRecording ? "warning" : "primary"}
                    onPress={handleToggleRecording}
                  >
                    <Icon icon={isRecording ? "lucide:pause" : "lucide:record-video"} className="mr-2" />
                    {isRecording ? "Pause Recording" : "Start Recording"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}