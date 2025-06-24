import React from 'react';
import { Card, CardBody, Tabs, Tab, Input, Select, SelectItem, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { Icon } from '@iconify/react';

export const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("history");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Panel de Control</h1>
      
      <Tabs 
        aria-label="Opciones del panel"
        selectedKey={selectedTab} 
        onSelectionChange={setSelectedTab as any}
      >
        <Tab key="history" title="Historial de Usuario">
          <Card>
            <CardBody>
              <Table aria-label="Historial de usuario" removeWrapper>
                <TableHeader>
                  <TableColumn>FECHA</TableColumn>
                  <TableColumn>DURACIÓN DE SESIÓN</TableColumn>
                  <TableColumn>PALABRAS TRADUCIDAS</TableColumn>
                  <TableColumn>CONFIANZA PROMEDIO</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>2023-04-01</TableCell>
                    <TableCell>00:45:23</TableCell>
                    <TableCell>532</TableCell>
                    <TableCell>89%</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>2023-03-28</TableCell>
                    <TableCell>01:12:07</TableCell>
                    <TableCell>847</TableCell>
                    <TableCell>92%</TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="settings" title="Configuración">
          <Card>
            <CardBody className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Configuración de Voz</h2>
                <Select 
                  label="Seleccionar Voz" 
                  placeholder="Elige una voz"
                  className="max-w-xs"
                >
                  <SelectItem key="voice1">Voz 1 (Predeterminada)</SelectItem>
                  <SelectItem key="voice2">Voz 2</SelectItem>
                  <SelectItem key="voice3">Voz 3</SelectItem>
                </Select>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Configuración de Fuente</h2>
                <Select 
                  label="Seleccionar Fuente" 
                  placeholder="Elige una fuente"
                  className="max-w-xs"
                >
                  <SelectItem key="font1">Sans-serif (Predeterminada)</SelectItem>
                  <SelectItem key="font2">Serif</SelectItem>
                  <SelectItem key="font3">Monospace</SelectItem>
                </Select>
              </div>
              <Button color="primary">Guardar Configuración</Button>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="admin" title="Controles de Administración">
          <Card>
            <CardBody className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Métricas del Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <span>Usuarios Activos</span>
                        <span className="text-2xl font-bold">1,234</span>
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <span>Tiempo Promedio de Sesión</span>
                        <span className="text-2xl font-bold">00:32:18</span>
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <span>Total de Traducciones</span>
                        <span className="text-2xl font-bold">1,567,890</span>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Gestión de Usuarios</h2>
                <div className="flex space-x-2">
                  <Input placeholder="Buscar usuarios" />
                  <Button color="primary">
                    <Icon icon="lucide:user-plus" className="mr-2" />
                    Agregar Usuario
                  </Button>
                </div>
                {/* User list table would go here */}
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}