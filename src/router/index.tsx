import { Route, Routes } from "react-router-dom";

import { LandingPage, Dashboard } from "pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/sign-up" />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
