import { useContext, useState } from "react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { Link } from "react-router-dom";
import {
  useTheme,
  useMediaQuery,
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
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { HiPlus } from "react-icons/hi";
import { MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Pagination from "../../Pagination/Pagination";
import "sweetalert2/dist/sweetalert2.min.css";

const fetchSponsoredPosts = async (port) => {
  const res = await fetch(`${port}/api/admin/Sponsored`);
  const data = await res.json();
  if (!data.Status)
    throw new Error(data.Error || "Failed to fetch sponsored posts");
  return data.Result;
};

const deleteSponsoredPost = async ({ port, id }) => {
  const res = await fetch(`${port}/api/admin/Sponsored/delete/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!data.Status)
    throw new Error(data.Error || "Failed to delete sponsored post");
  return data;
};

const itemsPerPage = 10;

const SponsoredPost = () => {
  const { state } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();

  // Query: all posts
  const {
    data: sponsoredPosts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sponsoredPosts"],
    queryFn: () => fetchSponsoredPosts(state.port),
  });

  // Pagination state (simple)
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sponsoredPosts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Mutation: delete post
  const mutation = useMutation({
    mutationFn: (id) => deleteSponsoredPost({ port: state.port, id }),
    onSuccess: () => {
      queryClient.invalidateQueries(["sponsoredPosts"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Sponsored post deleted successfully.",
        timer: 1300,
        showConfirmButton: false,
        background: "#23263a",
        color: "#fff",
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Delete failed",
        background: "#23263a",
        color: "#fff",
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will delete the sponsored post.",
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
        mutation.mutate(id);
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

  return (
    <Box
      className="container dashboard_All"
      sx={{
        px: isMobile ? 1 : 3,
        py: 3,
        color: "#fff",
      }}
    >
      <Typography variant="h3" className="dashboard_name" gutterBottom>
        All Sponsored Posts
      </Typography>
      <hr style={{ borderColor: "#222", opacity: 0.2 }} />
      {error && (
        <Box sx={{ my: 2, color: "error.main" }}>
          <Typography variant="body1">{error.message}</Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Link to="/dashboard/Sponsored/create">
          <Button
            variant="contained"
            color="primary"
            startIcon={<HiPlus />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 16,
              px: 3,
              py: 1.5,
              boxShadow: 2,
            }}
          >
            Create Sponsored Post
          </Button>
        </Link>
      </Box>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          background: "transparent",
          color: "#fff",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "rgba(255,255,255,0.05)" }}>
                <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                  SL
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                  TITLE
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                  START DATE
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                  END DATE
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                  IMAGE
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress color="inherit" />
                  </TableCell>
                </TableRow>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((post, index) => (
                  <TableRow key={post.id} hover sx={{ color: "#fff" }}>
                    <TableCell sx={{ color: "#fff" }}>
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>{post.title}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {formatDate(post.start_date)}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {formatDate(post.end_date)}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      <img
                        className="Team_member_Image"
                        src={
                          post.image_url
                            ? `${state.port}/Images/${post.image_url}`
                            : "https://i.postimg.cc/KzNdw0LX/Group.png"
                        }
                        alt={post.title}
                        style={{
                          width: 60,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          component={Link}
                          to={`/dashboard/Sponsored/edit/${post.id}`}
                          color="primary"
                          sx={{ mx: 0.5 }}
                        >
                          <MdEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Show" arrow>
                        <IconButton
                          component={Link}
                          to={`/dashboard/Sponsored/${post.id}`}
                          color="info"
                          sx={{ mx: 0.5 }}
                        >
                          <MdVisibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(post.id)}
                          sx={{ mx: 0.5 }}
                        >
                          <MdDelete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1" sx={{ color: "#fff" }}>
                      No sponsored posts found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Pagination
        totalItems={sponsoredPosts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
};

export default SponsoredPost;
