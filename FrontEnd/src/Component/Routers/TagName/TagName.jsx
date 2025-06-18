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
import axios from "axios";

const fetchTagNames = async (port) => {
  const res = await axios.get(`${port}/api/admin/TagName`);
  if (!res.data.Status)
    throw new Error(res.data.Error || "Failed to fetch tag names");
  return res.data.Result;
};

const deleteTagName = async ({ port, uuid }) => {
  const res = await axios.delete(`${port}/api/admin/TagName/delete/${uuid}`);
  if (!res.data.Status)
    throw new Error(res.data.Error || "Failed to delete tag name");
  return res.data;
};

const TagNameList = () => {
  const { state } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();

  const {
    data: tagNames,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["TagNames"],
    queryFn: () => fetchTagNames(state.port),
  });

  const mutation = useMutation({
    mutationFn: (uuid) => deleteTagName({ port: state.port, uuid }),
    onSuccess: () => {
      queryClient.invalidateQueries(["TagNames"]);
      toast.success("Tag deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = (uuid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this tag?",
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

  // Tailwind gray-600 hex: #4b5563
  const borderBottom = "1.5px solid #4b5563";

  return (
    <Box sx={{ px: isMobile ? 1 : 2, py: 2, color: "#fff" }}>
      <h1 className="text-2xl md:text-3xl mb-2 font-bold">Tags</h1>
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
        <Link to="/dashboard/TagName/create">
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
            New Tag
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
                  Tag Name
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
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="center"
                    sx={{ py: 3, borderBottom }}
                  >
                    <CircularProgress color="inherit" size={22} />
                  </TableCell>
                </TableRow>
              ) : tagNames && tagNames.length > 0 ? (
                tagNames.map((item, index) => (
                  <TableRow
                    key={item.uuid}
                    hover
                    sx={{ color: "#fff", borderBottom }}
                  >
                    <TableCell sx={{ color: "#fff", borderBottom }}>
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", borderBottom }}>
                      {item.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "#fff", borderBottom }}
                    >
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          component={Link}
                          to={`/dashboard/TagName/edit/${item.uuid}`}
                          color="primary"
                          sx={{ mx: 0.5, p: 0.75 }}
                        >
                          <MdEdit size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(item.uuid)}
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
                    sx={{ py: 2, borderBottom }}
                  >
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      No tags found.
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

export default TagNameList;
  