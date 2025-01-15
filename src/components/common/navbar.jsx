import {IoMenuOutline} from "react-icons/io5";
import {FiMoon, FiSun} from "react-icons/fi";
import {useTheme} from "../../context/ThemeContext";
import {useGrid} from "../../context/gridContext";

function Navbar() {
  const {theme, toggleTheme, toggleSidebar} = useTheme();
  const {view, toggleView} = useGrid();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white dark:bg-[#242424] transition-colors duration-200">
      <div className="flex gap-6">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <IoMenuOutline className="h-6 w-6 dark:text-white cursor-pointer" />
        </button>
        <img src="/logo.png" alt="logo" className="w-[90px] h-[32px]" />
      </div>
      <div className="flex gap-6">
        <img
          src="/icons/search.svg"
          alt="search"
          className="w-6 h-6 dark:invert"
        />
        <button className="focus:outline-none" onClick={toggleView}>
          <img
            src="/icons/app-grid.svg"
            alt="cart"
            className="w-6 h-6 dark:invert"
          />
        </button>
        <button onClick={handleThemeToggle} className="focus:outline-none">
          {theme === "light" ? (
            <FiMoon className="w-6 h-6" />
          ) : (
            <FiSun className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
