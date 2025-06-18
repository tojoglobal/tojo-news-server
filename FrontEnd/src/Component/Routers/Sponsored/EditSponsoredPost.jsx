import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

// Convert UTC date to local yyyy-mm-dd
const formatDateToLocal = (utcDate) => {
  if (!utcDate) return "";
  const date = new Date(utcDate);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().split("T")[0];
};

const EditSponsoredPost = () => {
  const { state } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [sponsoredPost, setSponsoredPost] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from DB
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${state.port}/api/admin/Sponsoredbyid/${id}`)
      .then((result) => {
        if (result.data.Status) {
          const post = result.data.Result[0];
          setSponsoredPost({
            ...post,
            start_date: formatDateToLocal(post.start_date),
            end_date: formatDateToLocal(post.end_date),
          });
          setFile(null);
        } else {
          setErrorMessage(result.data.Error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message || "Failed to fetch sponsored post");
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [id]);

  const today = new Date().toISOString().split("T")[0];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: sponsoredPost.title || "",
      description: sponsoredPost.description || "",
      start_date: sponsoredPost.start_date || "",
      end_date: sponsoredPost.end_date || "",
      file: "",
      is_recent: sponsoredPost.is_recent ? true : false,
    },
    validate: (values) => {
      const errors = {};
      if (values.start_date && values.start_date < today) {
        errors.start_date = "Start date cannot be before today";
      }
      if (values.end_date && values.end_date <= values.start_date) {
        errors.end_date = "End date must be after start date";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("is_recent", values.is_recent ? "true" : "false");
      if (values.file instanceof File) {
        formData.append("file", values.file);
      }

      try {
        const response = await axios.put(
          `${state.port}/api/admin/Sponsored/edit/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success("Sponsored Post updated successfully!", {
            position: "top-right",
            duration: 4000,
          });
          setTimeout(() => navigate(`/dashboard/Sponsored`), 1200);
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.Error || error.message || "Update failed"
        );
      }
      resetForm();
    },
  });

  // Handle image change
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      formik.setFieldValue("file", selectedFile);
    }
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
        Edit Sponsored Post
      </Typography>
      <hr style={{ borderColor: "#222", opacity: 0.2 }} />
      {errorMessage && (
        <Box sx={{ my: 2, color: "error.main" }}>
          <Typography variant="body1">{errorMessage}</Typography>
        </Box>
      )}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          background: "rgba(30,32,58,0.98)",
          color: "#fff",
          p: { xs: 1.5, sm: 3, md: 5 },
          width: "100%",
          boxShadow: "0 4px 32px #1a1c28",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 7 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <Grid container spacing={3} sx={{ width: "100%", margin: 0 }}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Title"
                  id="title"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  required
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#7aa8e6" },
                    mb: 3,
                  }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  multiline
                  minRows={4}
                  required
                  sx={{
                    textarea: { color: "#fff" },
                    label: { color: "#7aa8e6" },
                    mb: 3,
                  }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      id="start_date"
                      name="start_date"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.start_date}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: today }}
                      required
                      error={Boolean(formik.errors.start_date)}
                      helperText={formik.errors.start_date}
                      sx={{
                        input: { color: "#fff" },
                        label: { color: "#7aa8e6" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="End Date"
                      id="end_date"
                      name="end_date"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.end_date}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: formik.values.start_date || today }}
                      required
                      error={Boolean(formik.errors.end_date)}
                      helperText={formik.errors.end_date}
                      sx={{
                        input: { color: "#fff" },
                        label: { color: "#7aa8e6" },
                      }}
                    />
                  </Grid>
                </Grid>
                <FormControl fullWidth sx={{ mt: 3 }}>
                  <InputLabel id="is_recent" sx={{ color: "#7aa8e6" }}>
                    Mark as Recent Article
                  </InputLabel>
                  <Select
                    labelId="is_recent"
                    id="is_recent"
                    name="is_recent"
                    value={formik.values.is_recent ? "true" : "false"}
                    label="Mark as Recent Article"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "is_recent",
                        e.target.value === "true"
                      )
                    }
                    sx={{
                      color: "#fff",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#324266",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#3b82f6",
                      },
                    }}
                  >
                    <MenuItem value="false">No</MenuItem>
                    <MenuItem value="true">Yes</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ pb: 1, fontWeight: 700, color: "#7aa8e6" }}>
                  Upload Image
                </Box>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<FaCloudUploadAlt />}
                  sx={{
                    color: "#7aa8e6",
                    borderColor: "#324266",
                    "&:hover": { borderColor: "#3b82f6", color: "#3b82f6" },
                    mb: 2,
                  }}
                  fullWidth
                >
                  Upload Image
                  <input
                    id="file"
                    type="file"
                    name="file"
                    hidden
                    onChange={handleChange}
                    accept=".jpg, .png"
                  />
                </Button>
                <Box sx={{ pb: 1, fontWeight: 700, color: "#7aa8e6" }}>
                  Preview Image
                </Box>
                <img
                  src={
                    file
                      ? file
                      : sponsoredPost.image_url
                      ? `${state.port}/Images/${sponsoredPost.image_url}`
                      : ""
                  }
                  alt="Sponsored Post Preview"
                  style={{
                    width: "100%",
                    maxWidth: 260,
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 9,
                    boxShadow: "0 2px 18px #1a1c28",
                  }}
                  loading="lazy"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: 17,
                    py: 1.3,
                    mt: 3,
                  }}
                >
                  Update Sponsored
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default EditSponsoredPost;
