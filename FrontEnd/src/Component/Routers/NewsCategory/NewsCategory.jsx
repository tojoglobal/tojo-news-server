import { useContext } from "react";
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
import { MdEdit, MdDelete } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import "sweetalert2/dist/sweetalert2.min.css";

const fetchNewsCategories = async (port) => {
  const res = await fetch(`${port}/api/admin/newsCategory`);
  const data = await res.json();
  if (!data.Status) throw new Error(data.Error || "Failed to fetch categories");
  return data.Result;
};

const deleteNewsCategory = async ({ port, uuid }) => {
  const res = await fetch(`${port}/api/admin/newsCategory/delete/${uuid}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!data.Status) throw new Error(data.Error || "Failed to delete category");
  return data;
};

const NewsCategory = () => {
  const { state } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newsCategories"],
    queryFn: () => fetchNewsCategories(state.port),
  });

  const mutation = useMutation({
    mutationFn: (uuid) => deleteNewsCategory({ port: state.port, uuid }),
    onSuccess: () => {
      queryClient.invalidateQueries(["newsCategories"]);
      toast.success("Category deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = (uuid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this news category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#E16565",
      cancelButtonText: "Cancel",
      background: "#101829",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(uuid);
      }
    });
  };

  return (
    <Box
      sx={{
        px: isMobile ? 1 : 2,
        py: 2,
        color: "#fff",
      }}
    >
      <h1 className="text-2xl md:text-3xl mb-2 font-bold">News Categories</h1>
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
        <Link to="/dashboard/newscategory/create">
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
            New Category
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
                    py: 1,
                    px: 1.5,
                    fontSize: 13,
                    borderBottom: "1.5px solid #4b5563", // gray-600
                  }}
                >
                  SL
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    py: 1,
                    px: 1.5,
                    fontSize: 13,
                    borderBottom: "1.5px solid #4b5563", // gray-600
                  }}
                >
                  CATEGORY NAME
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    textAlign: "center",
                    borderBottom: "1.5px solid #4b5563", // gray-600
                  }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="center"
                    sx={{
                      py: 3,
                      borderBottom: "1.5px solid #4b5563",
                    }}
                  >
                    <CircularProgress color="inherit" size={22} />
                  </TableCell>
                </TableRow>
              ) : categories && categories.length > 0 ? (
                categories.map((cl, index) => (
                  <TableRow
                    key={cl.uuid}
                    hover
                    sx={{
                      color: "#fff",
                      borderBottom: "1.5px solid #4b5563",
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#fff",
                        borderBottom: "1.5px solid #4b5563",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        borderBottom: "1.5px solid #4b5563",
                      }}
                    >
                      {cl.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#fff",
                        borderBottom: "1.5px solid #4b5563",
                      }}
                    >
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          component={Link}
                          to={`/dashboard/newscategory/edit/${cl.uuid}`}
                          color="primary"
                          sx={{ mx: 0.5, p: 0.75 }}
                        >
                          <MdEdit size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(cl.uuid)}
                          sx={{ mx: 1 }}
                        >
                          <MdDelete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="center"
                    sx={{
                      py: 2,
                      borderBottom: "1.5px solid #4b5563",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      No categories found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default NewsCategory;
