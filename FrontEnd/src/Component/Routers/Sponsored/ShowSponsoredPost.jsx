import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import DOMPurify from "dompurify";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { FaEdit } from "react-icons/fa";

const ShowSponsoredPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [sponsoredPost, setSponsoredPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${state.port}/api/admin/Sponsoredbyid/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setSponsoredPost(result.data.Result[0]);
          setErrorMessage(null);
        } else {
          setSponsoredPost(null);
          setErrorMessage(result.data.Error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSponsoredPost(null);
        setErrorMessage("Failed to fetch post");
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [id]);

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
        py: 3,
        width: "100%",
        maxWidth: "100vw",
        px: { xs: 1, sm: 3, md: 6, lg: 10 },
      }}
    >
      <Typography variant="h3" className="dashboard_name" gutterBottom>
        Sponsored Post Info
      </Typography>
      <hr style={{ borderColor: "#222", opacity: 0.2 }} />
      {errorMessage && (
        <Box sx={{ my: 2, color: "error.main" }}>
          <Typography variant="body1">{errorMessage}</Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        <Link
          to="/dashboard/Sponsored"
          className="route_link"
          style={{ textDecoration: "none" }}
        >
          <Button
            startIcon={<IoMdArrowRoundBack />}
            variant="outlined"
            sx={{ color: "#fff", borderColor: "#22263a", mr: 2 }}
          >
            Back
          </Button>
        </Link>
        <Link
          to={`/dashboard/Sponsored/edit/${id}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            startIcon={<FaEdit />}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              px: 3,
              py: 1,
              boxShadow: 2,
            }}
          >
            Edit
          </Button>
        </Link>
      </Box>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          width: "100%",
          background: "rgba(30,32,58,0.98)",
          color: "#fff",
          p: { xs: 1.5, sm: 3, md: 5 },
          boxShadow: "0 4px 32px #1a1c28",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 7 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : sponsoredPost ? (
          <Table sx={{ width: "100%" }}>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#7aa8e6",
                    fontWeight: 700,
                    width: { xs: 100, sm: 160 },
                    background: "transparent",
                  }}
                >
                  Image
                </TableCell>
                <TableCell sx={{ color: "#fff", background: "transparent" }}>
                  <img
                    className="blog_Image"
                    src={
                      sponsoredPost.image_url
                        ? `${state.port}/Images/${sponsoredPost.image_url}`
                        : "https://i.postimg.cc/KzNdw0LX/Group.png"
                    }
                    alt={sponsoredPost.title}
                    style={{
                      width: "100%",
                      maxWidth: 280,
                      height: "auto",
                      borderRadius: 10,
                      boxShadow: "0 2px 24px #2c3444",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "#7aa8e6", fontWeight: 700 }}>
                  Title
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {sponsoredPost.title}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "#7aa8e6", fontWeight: 700 }}>
                  Description
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(sponsoredPost.description),
                    }}
                  ></div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "#7aa8e6", fontWeight: 700 }}>
                  Start Date
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {formatDate(sponsoredPost.start_date)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "#7aa8e6", fontWeight: 700 }}>
                  End Date
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {formatDate(sponsoredPost.end_date)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: "#7aa8e6", fontWeight: 700 }}>
                  Published At
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {sponsoredPost.published_at
                    ? new Date(sponsoredPost.published_at).toLocaleString()
                    : "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1" sx={{ color: "#fff" }}>
            No sponsored post found.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ShowSponsoredPost;
