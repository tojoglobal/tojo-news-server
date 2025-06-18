const Logo = ({ collapsed }) => (
  <div className="p-2 flex items-center justify-center">
    {collapsed ? (
      <div className="text-xl font-bold">TN</div>
    ) : (
      <div className="text-xl font-bold">TOJO News</div>
    )}
  </div>
);

export default Logo;
