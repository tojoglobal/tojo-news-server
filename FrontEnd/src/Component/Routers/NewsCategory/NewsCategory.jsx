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
  Skeleton,
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

  const borderBottom = "1.5px solid #4b5563";

  const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell sx={{ py: 2, borderBottom }}>
        <Skeleton variant="text" width="20px" sx={{ bgcolor: "grey.700" }} />
      </TableCell>
      <TableCell sx={{ py: 2, borderBottom }}>
        <Skeleton variant="text" width="80%" sx={{ bgcolor: "grey.700" }} />
      </TableCell>
      <TableCell sx={{ py: 2, borderBottom }} align="center">
        <Skeleton
          variant="rectangular"
          width={100}
          height={30}
          sx={{ bgcolor: "grey.700", borderRadius: "6px", mx: "auto" }}
        />
      </TableCell>
    </TableRow>
  ));

  return (
    <Box
      sx={{
        px: isMobile ? 1 : 2,
        py: 2,
        color: "#fff",
      }}
    >
      <Typography variant="h5" className="font-bold mb-2" gutterBottom>
        News Categories
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
                    borderBottom,
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
                    borderBottom,
                  }}
                >
                  CATEGORY NAME
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    textAlign: "center",
                    borderBottom,
                  }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? skeletonRows
                : categories && categories.length > 0
                ? categories.map((cl, index) => (
                    <TableRow
                      key={cl.uuid}
                      hover
                      sx={{
                        color: "#fff",
                        borderBottom,
                      }}
                    >
                      <TableCell sx={{ color: "#fff", borderBottom }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ color: "#fff", borderBottom }}>
                        {cl.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: "#fff", borderBottom }}
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
                : !isLoading && (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        align="center"
                        sx={{
                          py: 2,
                          borderBottom,
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
