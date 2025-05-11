import { AppProvider } from "./providers/app";
import { AppRoutes } from "./routes";
import UserDataFetcher from './components/auth/UserDataFetcher';

export default function App() {
  return (
    <AppProvider>
      <UserDataFetcher />
      <AppRoutes />
    </AppProvider>
  );
}
