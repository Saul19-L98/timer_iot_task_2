import React from "react";
import Timer from "./pages/Timer.jsx";
import Chronmeter from "./pages/Chronmeter.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="bg-stone-900 h-full flex flex-col items-center md:h-screen">
        <h1 className="mt-8 mb-8  text-5xl text-emerald-300">Chronmeter App</h1>
        <Chronmeter />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
