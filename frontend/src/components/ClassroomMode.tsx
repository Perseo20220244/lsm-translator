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
      <h1 className="text-2xl font-bold">Classroom Mode</h1>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Calibration</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Progress 
            aria-label="Calibration progress" 
            value={(calibrationStep / 3) * 100} 
            className="max-w-md"
          />
          <div className="space-y-2">
            {calibrationStep === 1 && (
              <p>Step 1: Please stand in the center of the camera frame.</p>
            )}
            {calibrationStep === 2 && (
              <p>Step 2: Perform a simple sign (e.g., "Hello") three times.</p>
            )}
            {calibrationStep === 3 && (
              <p>Step 3: System is fine-tuning. Please wait...</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button 
              color="primary" 
              variant="flat" 
              onPress={handleCalibrationPrev}
              isDisabled={calibrationStep === 1}
            >
              Previous
            </Button>
            <Button 
              color="primary" 
              onPress={handleCalibrationNext}
              isDisabled={calibrationStep === 3}
            >
              {calibrationStep === 3 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Live Translation</h2>
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
              <h3 className="text-lg font-semibold mb-2">Translated Text</h3>
              <p className="p-4 bg-content2 rounded-lg text-3xl text-center">
                The translated text will appear here.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                isIconOnly
                color={isPaused ? "warning" : "success"}
                aria-label={isPaused ? "Resume" : "Pause"}
                onPress={togglePause}
              >
                <Icon icon={isPaused ? "lucide:play" : "lucide:pause"} className="text-2xl" />
              </Button>
              <Button
                isIconOnly
                color="danger"
                aria-label="Stop"
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
