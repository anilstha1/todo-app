import {Routes, Route, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTheme} from "./context/ThemeContext";
import Navbar from "./components/common/navbar";
import Sidebar from "./components/common/sidebar";
import Home from "./components/pages/home";
import Login from "./components/auth/Login";
import TodayTask from "./components/pages/today-task";
import ImportantTask from "./components/pages/important-task";

function PrivateRoute({children}) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const {isSidebarOpen} = useTheme();

  return (
    <div className="min-h-screen w-full transition-colors duration-200 bg-white dark:bg-[#242424] text-gray-900 dark:text-white">
      <div className="max-w-[1440px] px-4 lg:px-[3rem] mx-auto">
        {isAuthenticated && <Navbar />}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 relative">
          {isAuthenticated && (
            <div
              className={`
              ${isSidebarOpen ? "block" : "hidden"} 
              absolute lg:relative z-50 w-full lg:w-auto bg-white dark:bg-[#242424]
            `}
            >
              <Sidebar />
            </div>
          )}
          <div className="flex-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/today-task"
                element={
                  <PrivateRoute>
                    <TodayTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/important-task"
                element={
                  <PrivateRoute>
                    <ImportantTask />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
