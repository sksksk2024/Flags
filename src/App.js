import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Countries from "./components/Countries";
import Country from "./components/Country";
import Header from "./components/Header";
import Error from "./components/Error";

function App() {
  return (
    <Router>
      <main className="bg-gray-100 dark:bg-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/:capital" element={<Country />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;