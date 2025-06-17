import { AiOutlineLogout } from "react-icons/ai";

const Logout = ({ handleLogout }) => {
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="group flex items-center gap-0 px-3 py-2 rounded-full bg-[#23263a] hover:bg-red-500 transition-colors duration-200 text-white relative overflow-hidden focus:outline-none"
      title="Logout"
    >
      <AiOutlineLogout className="text-lg md:text-xl transition-colors duration-200 group-hover:text-white" />
      <span
        className="cursor-pointer
          ml-0 w-0 max-w-0
          group-hover:ml-2 group-hover:w-auto group-hover:max-w-xs
          overflow-hidden transition-all duration-300
          whitespace-nowrap text-sm font-bold
          group-hover:text-white
        "
      >
        LOGOUT
      </span>
    </button>
  );
};

export default Logout;
