import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { CustomThemeProvider } from "./Contexts/themeContext";
import { AppWrapper } from "./Contexts/sharedata";
import { ColorPicker } from "./Contexts/sharePickerColor";
import ToastProvider from "./Components/toast/page";
const fontName = Figtree({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "BI Dashboard",
  description: "New BI Dashboard",
};

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={fontName.className}>
      <CustomThemeProvider>
        <AppWrapper>
          <ColorPicker>
          <ToastProvider>
          {children}
          </ToastProvider>
          </ColorPicker>
          </AppWrapper>
      </CustomThemeProvider>
    </body>
  </html>
  );
}
