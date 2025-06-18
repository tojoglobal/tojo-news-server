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

const fetchAuthors = async (port) => {
  const res = await fetch(`${port}/api/admin/author`);
  const data = await res.json();
  if (!data.Status) throw new Error(data.Error || "Failed to fetch authors");
  return data.Result;
};

const deleteAuthor = async ({ port, uuid }) => {
  const res = await fetch(`${port}/api/admin/author/delete/${uuid}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!data.Status) throw new Error(data.Error || "Failed to delete author");
  return data;
};

const Author = () => {
  const { state } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();

  const {
    data: authors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: () => fetchAuthors(state.port),
  });

  const mutation = useMutation({
    mutationFn: (uuid) => deleteAuthor({ port: state.port, uuid }),
    onSuccess: () => {
      queryClient.invalidateQueries(["authors"]);
      toast.success("Author deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = (uuid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this author?",
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
      <h1 className="text-xl md:text-2xl mb-2 font-bold">Authors</h1>
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
        <Link to="/dashboard/author/create">
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
            New Author
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
                  }}
                >
                  Author NAME
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
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    <CircularProgress color="inherit" size={22} />
                  </TableCell>
                </TableRow>
              ) : authors && authors.length > 0 ? (
                authors.map((cl, index) => (
                  <TableRow key={cl.uuid} hover sx={{ color: "#fff" }}>
                    <TableCell sx={{ color: "#fff" }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{cl.name}</TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          component={Link}
                          to={`/dashboard/author/edit/${cl.uuid}`}
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
                  <TableCell colSpan={3} align="center" sx={{ py: 2 }}>
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      No authors found.
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

export default Author;
