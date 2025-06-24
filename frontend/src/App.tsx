import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LiveSession } from './components/LiveSession';
import { Dashboard } from './components/Dashboard';
import { ClassroomMode } from './components/ClassroomMode';

const App: React.FC = () => {
  return (
    <Router>
        <Navbar isBordered>
          <NavbarBrand>
            <Icon icon="lucide:sign-language" width="24" height="24" />
            <p className="font-bold text-inherit">Traductor LSM</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="/">
                Sesión en Vivo
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/dashboard">
                Panel de Control
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/classroom">
                Modo Aula
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Registrarse
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <main className="container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/" component={LiveSession} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/classroom" component={ClassroomMode} />
          </Switch>
        </main>
      </Router>
  );
}

export default App;