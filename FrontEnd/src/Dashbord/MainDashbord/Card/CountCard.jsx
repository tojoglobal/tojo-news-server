import PropTypes from "prop-types";

const DashboardCard = ({ title, count, icon, loading }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-white">
            {loading ? (
              <div className="h-8 w-16 bg-gray-700 rounded animate-pulse" />
            ) : (
              count
            )}
          </h3>
        </div>
        <div className="p-3 rounded-lg bg-gray-700 text-gray-300">
          {icon}
        </div>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

DashboardCard.defaultProps = {
  loading: false,
};

export default DashboardCard;
