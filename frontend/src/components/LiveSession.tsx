import React from 'react';
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { Icon } from '@iconify/react';

export const LiveSession: React.FC = () => {
  const [isSessionActive, setIsSessionActive] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);

  const handleStartSession = () => {
    setIsSessionActive(true);
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    setIsRecording(false);
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

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
          <div className="aspect-video bg-gray-200 mb-4 rounded-lg flex items-center justify-center relative">
            <Icon icon="lucide:camera-off" className="text-4xl text-gray-400" />
            {isRecording && (
              <div className="absolute top-2 right-2 flex items-center space-x-2 bg-danger text-white px-2 py-1 rounded-full">
                <Icon icon="lucide:record-video" className="animate-pulse" />
                <span className="text-sm">Grabando</span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Texto Traducido</h2>
              <p className="p-4 bg-content2 rounded-lg">
                {isSessionActive ? "El texto traducido aparecerá aquí en tiempo real." : "Inicia una sesión para comenzar la traducción."}
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