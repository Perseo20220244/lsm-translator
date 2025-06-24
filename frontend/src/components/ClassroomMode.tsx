import React from 'react';
import { Card, CardBody, CardHeader, Button, Progress } from "@heroui/react";
import { Icon } from '@iconify/react';

export const ClassroomMode: React.FC = () => {
  const [calibrationStep, setCalibrationStep] = React.useState(1);
  const [isPaused, setIsPaused] = React.useState(false);

  const handleCalibrationNext = () => {
    setCalibrationStep((prev) => Math.min(prev + 1, 3));
  };

  const handleCalibrationPrev = () => {
    setCalibrationStep((prev) => Math.max(prev - 1, 1));
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sesión de Salón</h1>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Calibración</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Progress 
            aria-label="Progreso de calibración"
            value={(calibrationStep / 3) * 100} 
            className="max-w-md"
          />
          <div className="space-y-2">
            {calibrationStep === 1 && (
              <p>Paso 1: Por favor, colócate en el centro del encuadre de la cámara.</p>
            )}
            {calibrationStep === 2 && (
              <p>Paso 2: Realiza una seña simple (ej: "Hola") tres veces.</p>
            )}
            {calibrationStep === 3 && (
              <p>Paso 3: El sistema se está ajustando. Por favor espera...</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button 
              color="primary" 
              variant="flat" 
              onPress={handleCalibrationPrev}
              isDisabled={calibrationStep === 1}
            >
              Anterior
            </Button>
            <Button 
              color="primary" 
              onPress={handleCalibrationNext}
              isDisabled={calibrationStep === 3}
            >
              {calibrationStep === 3 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Traducción en Vivo</h2>
        </CardHeader>
        <CardBody>
          <div className="aspect-video bg-gray-200 mb-4 rounded-lg flex items-center justify-center relative">
            <Icon icon="lucide:camera-off" className="text-4xl text-gray-400" />
            {isPaused && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Icon icon="lucide:pause" className="text-6xl text-white" />
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Texto Traducido</h3>
              <p className="p-4 bg-content2 rounded-lg text-3xl text-center">
                El texto traducido aparecerá aquí.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                isIconOnly
                color={isPaused ? "warning" : "success"}
                aria-label={isPaused ? "Reanudar" : "Pausar"}
                onPress={togglePause}
              >
                <Icon icon={isPaused ? "lucide:play" : "lucide:pause"} className="text-2xl" />
              </Button>
              <Button
                isIconOnly
                color="danger"
                aria-label="Detener"
              >
                <Icon icon="lucide:square" className="text-2xl" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
