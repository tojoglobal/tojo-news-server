/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { HiPlus } from "react-icons/hi";
import { MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import Pagination from "../../Pagination/Pagination";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

const itemsPerPage = 10;

const fetchEvents = async (port) => {
  const res = await fetch(`${port}/api/admin/events`);
  const data = await res.json();
  if (!data.Status) throw new Error(data.Error || "Failed to fetch events");
  return data.Result;
};

const deleteEvent = async ({ port, uuid }) => {
  const res = await fetch(`${port}/api/admin/events/delete/${uuid}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!data.Status) throw new Error(data.Error || "Failed to delete event");
  return data;
};

const EventsPost = () => {
  const { state } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // fetch events
  useEffect(() => {
    setLoading(true);
    fetchEvents(state.port)
      .then((result) => setEvents(result))
      .catch((err) => {
        toast.error(err.message || "Error loading events.", {
          position: "top-right",
        });
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [state.port]);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = events.slice(startIndex, startIndex + itemsPerPage);

  // Delete logic
  const handleDelete = (uuid) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will delete the event.",
      showCancelButton: true,
      confirmButtonColor: "#E16565",
      cancelButtonColor: "#23263a",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#23263a",
      color: "#fff",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEvent({ port: state.port, uuid })
          .then(() => {
            setEvents((prev) => prev.filter((e) => e.uuid !== uuid));
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Event deleted successfully.",
              timer: 1300,
              showConfirmButton: false,
              background: "#23263a",
              color: "#fff",
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: err.message || "Delete failed",
              background: "#23263a",
              color: "#fff",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.error("Cancelled", {
          position: "top-right",
        });
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // gray-600: #4b5563
  const borderBottom = "1.5px solid #4b5563";

  return (
    <Box
      sx={{
        px: isMobile ? 1 : 2,
        py: 2,
        color: "#fff",
      }}
    >
      <Typography variant="h5" className="font-bold mb-2" gutterBottom>
        All Events
      </Typography>
      <hr style={{ borderColor: "#222", opacity: 0.2 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Link to="/dashboard/events/create">
          <Button
            variant="contained"
            color="primary"
            startIcon={<HiPlus />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 14,
              px: 2,
              py: 0.8,
              boxShadow: 1,
              minWidth: 0,
            }}
          >
            Create Event
          </Button>
        </Link>
      </Box>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          background: "transparent",
          color: "#fff",
        }}
      >
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: "rgba(255,255,255,0.03)" }}>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    py: 1.4,
                    px: 1.6,
                    fontSize: 15,
                    borderBottom,
                  }}
                >
                  SL
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    py: 1.4,
                    px: 1.6,
                    fontSize: 15,
                    borderBottom,
                  }}
                >
                  TITLE
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    py: 1.4,
                    px: 1.6,
                    fontSize: 15,
                    borderBottom,
                  }}
                >
                  LOCATION
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    py: 1.4,
                    px: 1.6,
                    fontSize: 15,
                    borderBottom,
                  }}
                >
                  DATE
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    py: 1.4,
                    px: 1.6,
                    fontSize: 15,
                    borderBottom,
                  }}
                >
                  IMAGE
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    textAlign: "center",
                    py: 1.4,
                    px: 1.6,
                    fontSize: 15,
                    borderBottom,
                  }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ py: 3, borderBottom }}
                  >
                    <CircularProgress color="inherit" size={22} />
                  </TableCell>
                </TableRow>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((post, index) => (
                  <TableRow
                    key={post.uuid}
                    hover
                    sx={{ color: "#fff", borderBottom }}
                  >
                    <TableCell
                      sx={{
                        color: "#fff",
                        py: 1.4,
                        px: 1.6,
                        fontSize: 15,
                        borderBottom,
                      }}
                    >
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        py: 1.4,
                        px: 1.6,
                        fontSize: 15,
                        borderBottom,
                      }}
                    >
                      {post.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        py: 1.4,
                        px: 1.6,
                        fontSize: 15,
                        borderBottom,
                      }}
                    >
                      {post.location}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        py: 1.4,
                        px: 1.6,
                        fontSize: 15,
                        borderBottom,
                      }}
                    >
                      {formatDate(post.date)}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", py: 1.4, px: 1.6, borderBottom }}
                    >
                      <img
                        src={
                          post.image_url
                            ? `${state.port}/Images/${post.image_url}`
                            : "https://i.postimg.cc/KzNdw0LX/Group.png"
                        }
                        alt={post.title}
                        style={{
                          width: 64,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#fff",
                        py: 1.4,
                        px: 1.6,
                        fontSize: 15,
                        borderBottom,
                      }}
                    >
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          component={Link}
                          to={`/dashboard/events/edit/${post.uuid}`}
                          color="primary"
                          sx={{ mx: 0.5, p: 0.75 }}
                        >
                          <MdEdit size={20} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Show" arrow>
                        <IconButton
                          component={Link}
                          to={`/dashboard/events/${post.uuid}`}
                          color="info"
                          sx={{ mx: 0.5, p: 0.75 }}
                        >
                          <MdVisibility size={20} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(post.uuid)}
                          sx={{ mx: 0.5, p: 0.75 }}
                        >
                          <MdDelete size={20} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ py: 2, borderBottom }}
                  >
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      No events found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Pagination
        totalItems={events.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
};

export default EventsPost;
