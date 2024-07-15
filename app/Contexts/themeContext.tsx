"use client"
import React, { createContext, useEffect, useMemo, useState } from 'react';
import {ThemeProvider,createTheme,CssBaseline} from '../Components/muiIcons/muiIcons';
interface ThemeContextType {
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  toggleColorMode: () => {},
});

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light'); // default to 'light'

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme');
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const defaultMode = storedTheme === 'dark' || (!storedTheme && prefersDarkMode) ? 'dark' : 'light';
            setMode(defaultMode);
            document.body.className = defaultMode === 'dark' ? 'dark-theme' : 'light-theme';
        }
    }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newMode);
        }
        setMode(newMode);
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === 'dark' && {
            primary: {
              main: '#ffffff',
            },
            error: {
              main: 'rgb(255, 118, 111)',
            },
            background: {
              default: '#1E2129',
              paper: '#11151e',
            },
          }),
          ...(mode === 'light' && {
            primary: {
              main: '#000000', 
            },
            background: {
              default: 'hsl(0, 0%, 98%)',
              paper: 'hsl(0, 0%, 98%)',
            },
          }),
        },
        shape: {
          borderRadius: 10, 
        },
        components: {
          MuiFormControl: {
            styleOverrides: {
              root: {
                margin: '0.8rem 0',
              },
            },
          },
          MuiTextField: {
            defaultProps: {
              variant: 'outlined',
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                margin:"-1px",
                border:"1px solid hsla(0, 0%, 50%, 0.3)",
                backgroundBlendMode: "darken",
                backdropFilter: "blur(10px)",
                backgroundColor: `${
                  mode === "dark" ? "rgba(17, 21, 30, 0.7)" : "rgba(255, 255, 255, 0.9)"
                }`,
                boxShadow: 'none',
              },
            },
          },
        },
        typography: {
          fontFamily: [
            'Figtree',
            'sans-serif'
          ].join(','),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
