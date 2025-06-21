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
  Skeleton,
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

  const {
    data: sponsoredPosts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sponsoredPosts"],
    queryFn: () => fetchSponsoredPosts(state.port),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sponsoredPosts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
        All Sponsored Posts
      </Typography>
      <hr style={{ borderColor: "#222", opacity: 0.2 }} />
      {error && (
        <Box sx={{ my: 1, color: "error.main" }}>
          <Typography variant="body2">{error.message}</Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
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
              fontSize: 14,
              px: 2,
              py: 0.8,
              boxShadow: 1,
              minWidth: 0,
            }}
          >
            Create Sponsored Post
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
                {[
                  "SL",
                  "TITLE",
                  "START DATE",
                  "END DATE",
                  "IMAGE",
                  "ACTIONS",
                ].map((head, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      fontWeight: 700,
                      color: "#fff",
                      py: 1.4,
                      px: 1.6,
                      fontSize: 15,
                      borderBottom,
                      textAlign: head === "ACTIONS" ? "center" : "left",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ py: 1.4, px: 1.6, borderBottom }}>
                      <Skeleton height={24} sx={{ bgcolor: "#4b5563" }} />
                    </TableCell>
                    <TableCell sx={{ py: 1.4, px: 1.6, borderBottom }}>
                      <Skeleton height={24} sx={{ bgcolor: "#4b5563" }} />
                    </TableCell>
                    <TableCell sx={{ py: 1.4, px: 1.6, borderBottom }}>
                      <Skeleton height={24} sx={{ bgcolor: "#4b5563" }} />
                    </TableCell>
                    <TableCell sx={{ py: 1.4, px: 1.6, borderBottom }}>
                      <Skeleton height={24} sx={{ bgcolor: "#4b5563" }} />
                    </TableCell>
                    <TableCell sx={{ py: 1.4, px: 1.6, borderBottom }}>
                      <Skeleton
                        variant="rectangular"
                        height={28}
                        width={50}
                        sx={{ bgcolor: "#4b5563", borderRadius: 1 }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 1.4, px: 1.6, borderBottom }}>
                      <Skeleton height={24} sx={{ bgcolor: "#4b5563" }} />
                    </TableCell>
                  </TableRow>
                ))
              ) : paginatedData.length > 0 ? (
                paginatedData.map((post, index) => (
                  <TableRow
                    key={post.id}
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
                      {formatDate(post.start_date)}
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
                      {formatDate(post.end_date)}
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
                          width: 50,
                          height: 28,
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
                          to={`/dashboard/Sponsored/edit/${post.id}`}
                          color="primary"
                          sx={{ mx: 0.5, p: 0.75 }}
                        >
                          <MdEdit size={20} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Show" arrow>
                        <IconButton
                          component={Link}
                          to={`/dashboard/Sponsored/${post.id}`}
                          color="info"
                          sx={{ mx: 0.5, p: 0.75 }}
                        >
                          <MdVisibility size={20} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(post.id)}
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
