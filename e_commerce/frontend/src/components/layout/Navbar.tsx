import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  function handleLogout() {
      navigate('/login');
      return;
  }

  return (
      <nav className="bg-gray-50 dark:bg-gray-800 shadow-sm">
          <div className="max-w-full mx-auto px-4 py-3 flex justify-between items-center">
              <ul className="flex flex-row gap-8 text-sm font-medium">
                  <li>
                      <NavLink
                          to="/home"
                          className={({ isActive }) =>
                              `transition-colors duration-200 ${
                                  isActive
                                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 pb-1'
                                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                              }`
                          }
                      >
                          Dashboard
                      </NavLink>
                  </li>
                  <li>
                      <NavLink
                          to="/indexTask"
                          className={({ isActive }) =>
                              `transition-colors duration-200 ${
                                  isActive
                                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 pb-1'
                                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                              }`
                          }
                      >
                          Task
                      </NavLink>
                  </li>
              </ul>

              {location.pathname === '/indexTask' && (
                  <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                  >
                      <NavLink to="/addTask"> Add Task </NavLink>
                  </button>
              )}
              <div className="px-4 py-1 flex flex-row gap-2 items-center bg-blue-500 rounded-lg">
                  <h2 className="text-lg font-semibold text-white">
                      Active User Name
                  </h2>
                  <button
                      onClick={handleLogout}
                      type="button"
                      className="px-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                  >
                      Logout
                  </button>
              </div>
          </div>
      </nav>
  );
}

export default Navbar;
