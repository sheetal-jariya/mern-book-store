// import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";

// const ThemeToggle = () => {
//   const { theme, setTheme } = useContext(ThemeContext);

//   return (
//     <select
//       value={theme}
//       onChange={(e) => setTheme(e.target.value)}
//       className="bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded p-1"
//     >
//       <option value="light">🌞 Light</option>
//       <option value="dark">🌙 Dark</option>
//       <option value="system">🖥️ System</option>
//     </select>
//   );
// };

// export default ThemeToggle;


import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 text-sm text-gray-900 dark:text-white rounded px-2 py-1"
    >
      <option value="light">🌞 Light</option>
      <option value="dark">🌙 Dark</option>
      <option value="system">🖥️ System</option>
    </select>
  );
};

export default ThemeToggle;
