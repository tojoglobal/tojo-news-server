import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../SmallComponent/AppContext";
import { ResponsivePie } from "@nivo/pie";
import { Link } from "react-router-dom";
import DashboardCard from "./Card/CountCard";
import {
  FaNewspaper,
  FaUsers,
  FaEnvelope,
  FaRegClock,
  FaEye,
  FaChartPie,
} from "react-icons/fa";

const formatLargeNumber = (value) => {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1) + "B";
  if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
  if (value >= 1000) return (value / 1000).toFixed(1) + "K";
  return value;
};

const MainDashbord = () => {
  const { state } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    newsCount: 0,
    usersCount: 0,
    subscribersCount: 0,
    eventsCount: 0,
    mostReadBlog: null,
    mostPopularBlog: null,
    latestBlog: null,
  });

  const [contentDistribution, setContentDistribution] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          newsRes,
          usersRes,
          subscribersRes,
          eventsRes,
          mostReadRes,
          popularRes,
          latestRes,
        ] = await Promise.all([
          axios.get(`${state.port}/api/admin/blogpost`),
          axios.get(`${state.port}/api/admin/user-count`),
          axios.get(`${state.port}/api/all-subscribers`),
          axios.get(`${state.port}/api/events`),
          axios.get(`${state.port}/api/getMostRead`),
          axios.get(`${state.port}/api/getMostPopulerViews`),
          axios.get(`${state.port}/api/getLatestNews`),
        ]);

        const allNews = newsRes.data?.Result || [];
        const totalViews = popularRes.data?.result || [];
        const totalReads = mostReadRes.data?.result || [];

        setContentDistribution([
          {
            id: "News",
            label: "News Articles",
            value: allNews.length,
          },
          {
            id: "Subscribers",
            label: "Subscribers",
            value: subscribersRes.data?.data?.length || 0,
          },
          {
            id: "Events",
            label: "Events",
            value: eventsRes.data?.result?.length || 0,
          },
          {
            id: "Users",
            label: "Users",
            value: usersRes.data?.totalUsers || 0,
          },
        ]);

        setStats({
          newsCount: allNews.length,
          usersCount: usersRes.data?.totalUsers || 0,
          subscribersCount: subscribersRes.data?.data?.length || 0,
          eventsCount: eventsRes.data?.result?.length || 0,
          mostReadBlog: totalReads[0] || null,
          mostPopularBlog: totalViews[0] || null,
          latestBlog: latestRes.data?.result?.[0] || null,
        });
      } catch (err) {
        setError(err.message);
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [state.port]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  const nivoTheme = {
    background: "transparent",
    textColor: "#e5e7eb",
    fontSize: 12,
    axis: {
      domain: { line: { stroke: "#4b5563", strokeWidth: 1 } },
      ticks: { line: { stroke: "#4b5563", strokeWidth: 1 } },
      legend: { text: { fill: "#e5e7eb", fontWeight: 600 } },
    },
    grid: { line: { stroke: "#374151", strokeWidth: 0.5 } },
    tooltip: {
      container: {
        background: "#1f2937",
        color: "#f9fafb",
        borderRadius: "0.375rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.25)",
      },
    },
    legends: { text: { fill: "#9ca3af" } },
    labels: { text: { fill: "#e5e7eb" } },
  };

  return (
    <div className="p-3 space-y-5">
      {/* Header */}
      <div className="space-y-[2px]">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-400">
          Key metrics and content performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="News Articles"
          count={loading ? "..." : formatLargeNumber(stats.newsCount)}
          icon={<FaNewspaper className="text-blue-500" />}
          loading={loading}
        />
        <DashboardCard
          title="Registered Users"
          count={loading ? "..." : formatLargeNumber(stats.usersCount)}
          icon={<FaUsers className="text-emerald-500" />}
          loading={loading}
        />
        <DashboardCard
          title="Newsletter Subs"
          count={loading ? "..." : formatLargeNumber(stats.subscribersCount)}
          icon={<FaEnvelope className="text-violet-500" />}
          loading={loading}
        />
        <DashboardCard
          title="Upcoming Events"
          count={loading ? "..." : formatLargeNumber(stats.eventsCount)}
          icon={<FaRegClock className="text-amber-500" />}
          loading={loading}
        />
      </div>

      {/* Content Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.mostPopularBlog && (
          <Link to="/dashboard/blogpost" className="group">
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors h-full">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-900/30 :text-blue-400">
                  <FaEye className="text-lg" />
                </div>
                <h3 className="font-medium text-white">
                  Most Viewed
                </h3>
              </div>
              <p className="text-gray-100 font-medium mb-2 line-clamp-2">
                {stats.mostPopularBlog.title}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>
                  {formatLargeNumber(stats.mostPopularBlog.total_views || 0)}{" "}
                  views
                </span>
                <span>
                  {new Date(
                    stats.mostPopularBlog.dateAndTime
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        )}

        {stats.mostReadBlog && (
          <Link to="/dashboard/blogpost" className="group">
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-emerald-500 transition-colors h-full">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-900/30 text-emerald-400">
                  <FaRegClock className="text-lg" />
                </div>
                <h3 className="font-medium text-white">
                  Most Read
                </h3>
              </div>
              <p className="text-gray-100 font-medium mb-2 line-clamp-2">
                {stats.mostReadBlog.title}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>
                  {Math.floor(
                    (stats.mostReadBlog.total_reading_time || 0) / 60
                  )}{" "}
                  min avg
                </span>
                <span>
                  {new Date(
                    stats.mostReadBlog.dateAndTime
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        )}
        {stats.latestBlog && (
          <Link to="/dashboard/blogpost" className="group">
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-violet-500 transition-colors h-full">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-violet-900/30 text-violet-400">
                  <FaNewspaper className="text-lg" />
                </div>
                <h3 className="font-medium text-white">
                  Latest Content
                </h3>
              </div>
              <p className="text-gray-100 font-medium mb-2 line-clamp-2">
                {stats.latestBlog.title}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span className="bg-violet-900/50 text-violet-200 px-2 py-1 rounded-full text-xs">
                  New
                </span>
                <span>
                  {new Date(stats.latestBlog.dateAndTime).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        )}
      </div>
      {/* Content Distribution */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-900/30 text-amber-400">
            <FaChartPie className="text-lg" />
          </div>
          <h2 className="font-medium text-white">
            Content Distribution
          </h2>
        </div>
        <div className="h-80">
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              Loading data...
            </div>
          ) : contentDistribution.length > 0 ? (
            <ResponsivePie
              data={contentDistribution}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#9ca3af"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor="#ffffff"
              colors={["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]}
              theme={nivoTheme}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#9ca3af",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#ffffff",
                      },
                    },
                  ],
                },
              ]}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainDashbord;
