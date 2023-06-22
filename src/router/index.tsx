import { Route, Routes } from "react-router-dom";

import { LandingPage, Dashboard, RegisterPage } from "pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/sign-up" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
