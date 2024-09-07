import { useState } from "react";
import StartScreen from "./components/StartScreen";
import SearchScreen from "./components/SearchScreen";

const App = () => {
  const [showSearchScreen, setShowSearchScreen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!showSearchScreen ? (
        <StartScreen onStart={() => setShowSearchScreen(true)} />
      ) : (
        <SearchScreen />
      )}
    </div>
  );
};

export default App;
