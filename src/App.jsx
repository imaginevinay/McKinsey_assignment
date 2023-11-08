import "./App.css";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./root/LandingPage";
import CustomTable from "./root/CustomTable";
import Layout from "./root/Layout";



function App() {
  return (
    <Provider store={appStore}>
    <main className="flex h-screen">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/products" element={<CustomTable />} />
        </Route>
      </Routes>
    </main>
    </Provider>
  );
}

export default App;
