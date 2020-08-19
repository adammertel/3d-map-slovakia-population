console.log("started");
import React from "react";
import { render } from "react-dom";
import create from "zustand";

import App from "./app";

export const stateStore = create((set) => ({
  loaded: false,
  setLoaded: () => set({ loaded: true }),
}));

const rootElement = document.getElementById("root");
render(<App />, rootElement);
