import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import DOMPurify from "dompurify";
import {
  Box,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { FaEdit } from "react-icons/fa";

const ShowEventsPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${state.port}/api/admin/events/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setEvent(result.data.Result[0]);
          setErrorMessage(null);
        } else {
          setEvent(null);
          setErrorMessage(result.data.Error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setEvent(null);
        setErrorMessage(err.message);
        setLoading(false);
      });
  }, [id, state.port]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box
      className="container dashboard_All"
      sx={{
        color: "#fff",
        width: "100%",
        maxWidth: "100vw",
        px: { xs: 1, sm: 3, md: 6, lg: 10 },
        py: 3,
      }}
    >
      <Typography
        variant="h3"
        className="dashboard_name"
        gutterBottom
        sx={{ color: "#fff", fontWeight: 700 }}
      >
        Event Info
      </Typography>
      <hr style={{ borderColor: "#222", opacity: 0.12 }} />
      {errorMessage && (
        <Typography variant="body1" sx={{ color: "#ff6565", my: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Grid item>
          <Button
            component={Link}
            to="/dashboard/events"
            variant="outlined"
            startIcon={<IoMdArrowRoundBack />}
            sx={{
              color: "#fff",
              borderColor: "#22263a",
              fontWeight: 600,
              "&:hover": { background: "#22263a", borderColor: "#1976d2" },
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to={`/dashboard/events/edit/${id}`}
            variant="contained"
            color="primary"
            startIcon={<FaEdit />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              px: 3,
              py: 1,
              background: "#22263a",
              boxShadow: "none",
              color: "#fff",
              "&:hover": { background: "#1976d2", color: "#fff" },
            }}
          >
            Edit
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 7 }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : event ? (
        <Table sx={{ width: "100%", background: "none" }}>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  color: "#7aa8e6",
                  fontWeight: 700,
                  width: { xs: 100, sm: 160 },
                  background: "transparent",
                  borderBottom: "1px solid #23263a",
                }}
              >
                Image
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  background: "transparent",
                  borderBottom: "1px solid #23263a",
                }}
              >
                <img
                  className="blog_Image"
                  src={
                    event.image_url
                      ? `${state.port}/Images/${event.image_url}`
                      : "https://i.postimg.cc/KzNdw0LX/Group.png"
                  }
                  alt={event.title}
                  style={{
                    width: "100%",
                    maxWidth: 260,
                    height: "auto",
                    borderRadius: 10,
                    boxShadow: "0 2px 24px #2c3444",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#7aa8e6",
                  fontWeight: 700,
                  borderBottom: "1px solid #23263a",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{ color: "#fff", borderBottom: "1px solid #23263a" }}
              >
                {event.title}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#7aa8e6",
                  fontWeight: 700,
                  borderBottom: "1px solid #23263a",
                }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{ color: "#fff", borderBottom: "1px solid #23263a" }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(event.description),
                  }}
                ></div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#7aa8e6",
                  fontWeight: 700,
                  borderBottom: "1px solid #23263a",
                }}
              >
                Location
              </TableCell>
              <TableCell
                sx={{ color: "#fff", borderBottom: "1px solid #23263a" }}
              >
                {event.location}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: "#7aa8e6", fontWeight: 700 }}>
                Date
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>
                {formatDate(event.date)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" sx={{ color: "#fff" }}>
          No event found.
        </Typography>
      )}
    </Box>
  );
};

export default ShowEventsPost;
