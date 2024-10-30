import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import routesConfig, { RoutePaths } from  "./routesConfig" 

describe('Route Configurations', () => {
  test('renders CatalogPage at /home', () => {
    render(
      <MemoryRouter initialEntries={[RoutePaths.HOME]}>
        <Routes>
          <Route path={RoutePaths.HOME} element={<routesConfig.HOME.element />} />
        </Routes>
      </MemoryRouter>
    );

  });

  test('renders ResumePage at /resume', () => {
    render(
      <MemoryRouter initialEntries={[RoutePaths.RESUME]}>
        <Routes>
          <Route path={RoutePaths.RESUME} element={<routesConfig.RESUME.element />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('RESUME')).toBeInTheDocument();
  });

  test('renders ProfilePage at /profile', () => {
    render(
      <MemoryRouter initialEntries={[RoutePaths.PROFILE]}>
        <Routes>
          <Route path={RoutePaths.PROFILE} element={<routesConfig.PROFILE.element />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('PROFILE')).toBeInTheDocument();
  });

  test('renders LoginPage at /', () => {
    render(
      <MemoryRouter initialEntries={[RoutePaths.LOGIN]}>
        <Routes>
          <Route path={RoutePaths.LOGIN} element={<routesConfig.LOGIN.element />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });
});
