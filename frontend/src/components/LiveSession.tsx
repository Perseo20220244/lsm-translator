import React, { useState, useRef, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { Icon } from '@iconify/react';

export const LiveSession: React.FC = () => {
  // --- Estados existentes ---
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- NUEVOS ESTADOS Y REFS para WebSocket y Traducción ---
  const [translatedText, setTranslatedText] = useState<string>('');
  const socketRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<number | null>(null);

  // --- Función para enviar un frame al backend ---
  const sendFrame = () => {
    // Asegurarse de que el video esté listo y el socket esté abierto
    if (videoRef.current && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Dibuja el frame actual del video en el canvas
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        // Convierte el canvas a una imagen en formato base64 (JPEG)
        const data = canvas.toDataURL('image/jpeg', 0.8); // Calidad del 80%
        // Envía los datos a través del WebSocket
        socketRef.current.send(data);
      }
    }
  };

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
      setCameraError('No se pudo acceder a la cámara. Asegúrate de conceder los permisos.');
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
    setTranslatedText(''); // Limpiar texto anterior
    await startCamera();

    // --- Lógica para conectar el WebSocket ---
    socketRef.current = new WebSocket("ws://localhost:5000/ws");

    socketRef.current.onopen = () => {
      console.log("WebSocket conectado exitosamente.");
      // Inicia el envío de frames cada 100ms
      intervalRef.current = setInterval(() => {
        sendFrame();
      }, 100);
    };

    // Manejador para cuando se recibe un mensaje del servidor
    socketRef.current.onmessage = (event) => {
      const newWord = event.data;
      console.log("Palabra recibida:", newWord);
      // Añade la nueva palabra al principio de la oración
      setTranslatedText(prevText => `${newWord} ${prevText}`);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket desconectado.");
      // Limpia el intervalo si el socket se cierra inesperadamente
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("Error en WebSocket:", error);
      setCameraError("Error de conexión con el servidor de traducción.");
    };
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    setIsRecording(false);
    stopCamera();

    // --- Lógica para desconectar y limpiar ---
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // --- Limpieza al desmontar el componente ---
  useEffect(() => {
    return () => {
      stopCamera();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sesión de Traducción en Vivo</h1>
          <div className="flex items-center space-x-2">
            <Icon icon={isSessionActive ? "lucide:video" : "lucide:video-off"} className={isSessionActive ? "text-success" : "text-danger"} />
            <span className={isSessionActive ? "text-success" : "text-danger"}>
              {isSessionActive ? "Conectado" : "Desconectado"}
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
                  <p className="text-gray-500 text-center">La señal de la cámara aparecerá aquí</p>
                )}
              </div>
            )}
            {isRecording && isSessionActive && (
              <div className="absolute top-2 right-2 flex items-center space-x-2 bg-danger text-white px-2 py-1 rounded-full">
                <Icon icon="lucide:record-video" className="animate-pulse" />
                <span className="text-sm">Grabando</span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Texto Traducido</h2>
              {/* --- ÁREA DE TEXTO MODIFICADA --- */}
              <p className="p-4 bg-content2 rounded-lg min-h-[50px] text-lg">
                {translatedText || (isSessionActive ? "Escuchando..." : "Inicia una sesión para comenzar la traducción.")}
              </p>
            </div>
            <div className="flex space-x-2">
              {!isSessionActive ? (
                <Button color="success" onPress={handleStartSession}>
                  <Icon icon="lucide:play" className="mr-2" />
                  Iniciar Sesión
                </Button>
              ) : (
                <>
                  <Button color="danger" onPress={handleEndSession}>
                    <Icon icon="lucide:stop" className="mr-2" />
                    Finalizar Sesión
                  </Button>
                  <Button
                    color={isRecording ? "warning" : "primary"}
                    onPress={handleToggleRecording}
                  >
                    <Icon icon={isRecording ? "lucide:pause" : "lucide:record-video"} className="mr-2" />
                    {isRecording ? "Pausar Grabación" : "Iniciar Grabación"}
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
