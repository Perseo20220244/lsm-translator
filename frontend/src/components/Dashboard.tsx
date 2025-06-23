import React from 'react';
import { Card, CardBody, Tabs, Tab, Input, Select, SelectItem, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { Icon } from '@iconify/react';

export const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("history");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <Tabs 
        aria-label="Dashboard options" 
        selectedKey={selectedTab} 
        onSelectionChange={setSelectedTab as any}
      >
        <Tab key="history" title="User History">
          <Card>
            <CardBody>
              <Table aria-label="User history" removeWrapper>
                <TableHeader>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>SESSION DURATION</TableColumn>
                  <TableColumn>WORDS TRANSLATED</TableColumn>
                  <TableColumn>AVG. CONFIDENCE</TableColumn>
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
        <Tab key="settings" title="Settings">
          <Card>
            <CardBody className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Voice Settings</h2>
                <Select 
                  label="Select Voice" 
                  placeholder="Choose a voice"
                  className="max-w-xs"
                >
                  <SelectItem key="voice1">Voice 1 (Default)</SelectItem>
                  <SelectItem key="voice2">Voice 2</SelectItem>
                  <SelectItem key="voice3">Voice 3</SelectItem>
                </Select>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Font Settings</h2>
                <Select 
                  label="Select Font" 
                  placeholder="Choose a font"
                  className="max-w-xs"
                >
                  <SelectItem key="font1">Sans-serif (Default)</SelectItem>
                  <SelectItem key="font2">Serif</SelectItem>
                  <SelectItem key="font3">Monospace</SelectItem>
                </Select>
              </div>
              <Button color="primary">Save Settings</Button>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="admin" title="Admin Controls">
          <Card>
            <CardBody className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">System Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <span>Active Users</span>
                        <span className="text-2xl font-bold">1,234</span>
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <span>Avg. Session Time</span>
                        <span className="text-2xl font-bold">00:32:18</span>
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <span>Total Translations</span>
                        <span className="text-2xl font-bold">1,567,890</span>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">User Management</h2>
                <div className="flex space-x-2">
                  <Input placeholder="Search users" />
                  <Button color="primary">
                    <Icon icon="lucide:user-plus" className="mr-2" />
                    Add User
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