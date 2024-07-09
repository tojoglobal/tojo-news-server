import { Link } from "react-router-dom";

const Logo = () => {
  // const logoImage = 'https://i.postimg.cc/SNJT55Zn/TOJO-GLOBAL.png'
  return (
    <div className="logo">
      <div className="logo_icon">
        <Link to="/dashboard">
          <img
            className="img-fluid"
            // src="/Tojo-News-Logo-300px.png"
            src="\footer.png"
            alt="logoImage"
          />
        </Link>
      </div>
    </div>
  );
};

export default Logo;
