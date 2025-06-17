import PropTypes from "prop-types";

const ToggleThemeButton = ({ darkTheme, toggleTheme, collapsed }) => (
  <div
    className={`p-4 ${
      collapsed ? "flex justify-center" : "flex justify-between items-center"
    }`}
  >
    {!collapsed && <span className="text-sm">Dark Mode</span>}
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        darkTheme ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      {darkTheme ? "🌙" : "☀️"}
    </button>
  </div>
);

ToggleThemeButton.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default ToggleThemeButton;
