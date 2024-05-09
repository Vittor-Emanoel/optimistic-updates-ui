import { ThemeProvider } from './app/contexts/ThemeContext';
import { ModeToggle } from './components/ThemeSwitcher';

export function App() {
  return (
    <ThemeProvider>
      <div>
        hello!
      </div>
      <ModeToggle />
    </ThemeProvider>
  );
}
