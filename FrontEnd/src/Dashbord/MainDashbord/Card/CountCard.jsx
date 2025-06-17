import PropTypes from "prop-types";

const DashboardCard = ({ title, count }) => {
  return (
    <div className="rounded-xl bg-gradient-to-br from-[#23263a] to-[#2c324b] shadow-lg p-6 flex items-center justify-between hover:shadow-2xl transition group border border-[#2c324b]/60">
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-blue-300 group-hover:text-blue-400">
          {title}
        </h3>
        <div className="text-gray-400 mt-1 text-sm md:text-base">
          Total {title}
        </div>
      </div>
      <div>
        <span className="text-4xl md:text-5xl font-extrabold text-blue-400 group-hover:text-white transition">
          {count}
        </span>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default DashboardCard;
