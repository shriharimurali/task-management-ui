import { Suspense } from "react";
import { AppRouter } from "router";

function App() {
  return (
    <div className="w-full min-h-screen">
      <Suspense fallback={<div>Loading....</div>}>
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;
