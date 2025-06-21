import { useContext } from "react";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import {
  useTheme,
  useMediaQuery,
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
import { MdDelete } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import "sweetalert2/dist/sweetalert2.min.css";

const fetchSubscribers = async (port) => {
  const res = await fetch(`${port}/api/all-subscribers`);
  if (!res.ok) throw new Error("Failed to fetch subscribers");
  const data = await res.json();
  if (!data.success)
    throw new Error(data.message || "Failed to fetch subscribers");
  return data.data;
};

const deleteSubscriber = async ({ port, id }) => {
  const res = await fetch(`${port}/api/subscribers/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  if (!data.success)
    throw new Error(data.message || "Failed to delete subscriber");
  return data;
};

const NewslettersData = () => {
  const { state } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();

  const {
    data: subscribers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["subscribers"],
    queryFn: () => fetchSubscribers(state.port),
    retry: 2,
  });

  const mutation = useMutation({
    mutationFn: deleteSubscriber,
    onSuccess: () => {
      queryClient.invalidateQueries(["subscribers"]);
      toast.success("Subscriber deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (id, email) => {
    Swal.fire({
      title: "Delete Subscriber?",
      html: `Are you sure you want to delete <b>${email}</b>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#101829",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ port: state.port, id });
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const borderColor = "#4b5563";

  const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton variant="text" width="20px" sx={{ bgcolor: "grey.700" }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="80%" sx={{ bgcolor: "grey.700" }} />
      </TableCell>
      <TableCell>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={24}
          sx={{ bgcolor: "grey.700", borderRadius: 1 }}
        />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="60%" sx={{ bgcolor: "grey.700" }} />
      </TableCell>
      <TableCell align="center">
        <Skeleton
          variant="circular"
          width={30}
          height={30}
          sx={{ bgcolor: "grey.700", mx: "auto" }}
        />
      </TableCell>
    </TableRow>
  ));

  return (
    <Box sx={{ px: isMobile ? 1 : 2, py: 2 }}>
      <h1 className="text-xl md:text-2xl mb-4 font-bold text-white">
        Newsletter Subscribers
      </h1>
      <hr style={{ borderColor: borderColor, opacity: 0.5 }} />

      {error && (
        <Box sx={{ my: 1 }}>
          <Typography variant="body2" className="text-white">
            Error: {error.message}{" "}
            <button onClick={() => refetch()} className="text-blue-400">
              Retry
            </button>
          </Typography>
        </Box>
      )}

      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        <TableContainer>
          <Table
            size={isMobile ? "small" : "medium"}
            sx={{
              "& .MuiTableCell-root": {
                borderBottom: `1px solid ${borderColor}`,
                color: "#ffffff",
              },
              "& .MuiTableHead-root": {
                "& .MuiTableCell-root": {
                  color: "#ffffff",
                  fontWeight: 700,
                },
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <TableCell>#</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Interests</TableCell>
                <TableCell>Subscribed On</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? skeletonRows
                : subscribers?.length > 0
                ? subscribers.map((subscriber, index) => (
                    <TableRow key={subscriber.id} hover>
                      <TableCell className="text-white">{index + 1}</TableCell>
                      <TableCell className="text-white">
                        {subscriber.email}
                      </TableCell>
                      <TableCell className="text-white">
                        <div className="flex flex-wrap gap-1">
                          {subscriber.interests
                            .split(",")
                            .map((interest, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-[#370094] rounded-md text-xs text-white"
                              >
                                {interest.trim()}
                              </span>
                            ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-white">
                        {formatDate(subscriber.created_at)}
                      </TableCell>
                      <TableCell align="center" className="text-white">
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() =>
                              handleDelete(subscriber.id, subscriber.email)
                            }
                            color="error"
                            size="small"
                            disabled={mutation.isLoading}
                          >
                            <MdDelete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                : !isLoading && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                        <Typography variant="body2" className="text-white">
                          No subscribers found
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

export default NewslettersData;
