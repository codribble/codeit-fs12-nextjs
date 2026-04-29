"use client";

import ThemeProvider from "@/providers/ThemeProvider";

const Providers = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
