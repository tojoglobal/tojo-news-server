const Logo = ({ collapsed }) => (
  <div className="flex items-center">
    <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
      TN
    </div>
    {!collapsed && (
      <span className="ml-3 text-lg font-semibold text-white">TOJO News</span>
    )}
  </div>
);

export default Logo;
