import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { Link } from "react-router-dom";
import {
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { HiPlus } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const TagNameServerRouter = () => {
  const { state } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tagNames, setTagNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // Fetch Tag Names
  useEffect(() => {
    let ignore = false;
    async function fetchTagNames() {
      setLoading(true);
      setError(undefined);
      try {
        const res = await axios.get(`${state.port}/api/admin/TagName`);
        if (!res.data.Status)
          throw new Error(res.data.Error || "Failed to fetch Tag Names");
        if (!ignore) setTagNames(res.data.Result);
      } catch (err) {
        if (!ignore) setError(err.message);
      }
      if (!ignore) setLoading(false);
    }
    fetchTagNames();
    return () => {
      ignore = true;
    };
  }, [state.port]);

  // Delete Tag Name
  const handleDelete = async (uuid) => {
    console.log("got",uuid);
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Tag Name?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#E16565",
      cancelButtonText: "Cancel",
      background: "#101829",
      color: "#fff",
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.delete(
        `${state.port}/api/admin/TagName/delete/${uuid}`
      );
      console.log(res);
      if (!res.data.Status)
        throw new Error(res.data.Error || "Failed to delete Tag Name");
      setTagNames((prev) => prev.filter((item) => item.uuid !== uuid));
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Tag Name deleted successfully.",
        timer: 1300,
        showConfirmButton: false,
        background: "#23263a",
        color: "#fff",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Deletion failed",
        background: "#23263a",
        color: "#fff",
      });
    }
  };

  return (
    <Box
      sx={{
        px: isMobile ? 1 : 2,
        py: 2,
        color: "#fff",
      }}
    >
      <h1 className="text-2xl md:text-3xl mb-2 font-bold">All Tag Names</h1>
      <hr style={{ borderColor: "#222", opacity: 0.2 }} />
      {error && (
        <Box sx={{ my: 1, color: "error.main" }}>
          <Typography variant="body2">{error}</Typography>
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
            Create Tag Name
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
                  Tag Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    <CircularProgress color="inherit" size={22} />
                  </TableCell>
                </TableRow>
              ) : tagNames && tagNames.length > 0 ? (
                tagNames.map((item, index) => (
                  <TableRow key={item.uuid} hover sx={{ color: "#fff" }}>
                    <TableCell sx={{ color: "#fff" }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{item.name}</TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
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
                  <TableCell colSpan={3} align="center" sx={{ py: 2 }}>
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      No Tag Names found.
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

export default TagNameServerRouter;
