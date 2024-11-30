import '../styles/global.css';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={theme}>
      <button onClick={toggleTheme}>
        Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
