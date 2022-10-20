import { AppContexts } from "./components/contexts";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <AppContexts>
      <AppRoutes />
    </AppContexts>
  );
}