import axios from "axios";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";

const CreateSponsoredPost = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("file", e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      file: "",
      is_recent: false,
    },
    onSubmit: async (values, { resetForm }) => {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);

      const startDate = new Date(values.start_date);
      const endDate = new Date(values.end_date);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (startDate < todayDate) {
        setErrorMessage("Start date cannot be in the past");
        return;
      }

      const minEndDate = new Date(startDate);
      minEndDate.setDate(minEndDate.getDate() + 1);

      if (endDate < minEndDate) {
        setErrorMessage("End date must be at least one day after start date");
        return;
      }

      const isRecent = values.is_recent === "true";
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("is_recent", isRecent.toString());
      formData.append("file", values.file);

      try {
        const response = await axios.post(
          `${state.port}/api/admin/Sponsored/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.Status) {
          setErrorMessage(null);
          toast.success(`Sponsored Post created successfully`, {
            position: "top-right",
            duration: 4000,
            style: { background: "#23263a", color: "#fff" },
          });
          setTimeout(() => {
            navigate(`/dashboard/Sponsored`);
          }, 1200);
        } else {
          setErrorMessage(
            response.data.Error || "Failed to create sponsored post"
          );
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.Error || error.message || "An error occurred"
        );
      }
      resetForm();
      setFile(null);
    },
  });

  return (
    <Box
      className="container dashboard_All"
      sx={{
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
        Create Sponsored Post
      </Typography>
      <hr style={{ borderColor: "#222", opacity: 0.12 }} />
      {errorMessage && (
        <Box sx={{ my: 2 }}>
          <Typography variant="body1" sx={{ color: "#ff6565" }}>
            {errorMessage}
          </Typography>
        </Box>
      )}
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: "100%" }}
        encType="multipart/form-data"
        autoComplete="off"
      >
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            margin: 0,
            color: "#fff",
            background: "none",
          }}
        >
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Title"
              id="title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              required
              autoFocus
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#aaa" } }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#444" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                },
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
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#aaa" } }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#444" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                },
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
                  InputLabelProps={{ shrink: true, style: { color: "#aaa" } }}
                  inputProps={{ min: today, style: { color: "#fff" } }}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#444" },
                      "&:hover fieldset": { borderColor: "#888" },
                      "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                    },
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
                  InputLabelProps={{ shrink: true, style: { color: "#aaa" } }}
                  inputProps={{
                    min: formik.values.start_date
                      ? (() => {
                          const minEnd = new Date(formik.values.start_date);
                          minEnd.setDate(minEnd.getDate() + 1);
                          return minEnd.toISOString().split("T")[0];
                        })()
                      : today,
                    style: { color: "#fff" },
                  }}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#444" },
                      "&:hover fieldset": { borderColor: "#888" },
                      "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="is_recent" sx={{ color: "#aaa" }}>
                Mark as Recent Article
              </InputLabel>
              <Select
                labelId="is_recent"
                id="is_recent"
                name="is_recent"
                value={formik.values.is_recent ? "true" : "false"}
                label="Mark as Recent Article"
                onChange={formik.handleChange}
                sx={{
                  color: "#fff",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#444",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                }}
              >
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ pb: 1, fontWeight: 700, color: "#aaa" }}>
              Upload Image
            </Box>
            <Button
              variant="outlined"
              component="label"
              startIcon={<FaCloudUploadAlt />}
              sx={{
                color: "#aaa",
                borderColor: "#444",
                "&:hover": { borderColor: "#888", color: "#1976d2" },
                mb: 2,
                width: "100%",
                justifyContent: "flex-start",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Upload Image
              <input
                id="file"
                type="file"
                name="file"
                hidden
                onChange={handleChange}
                accept=".jpg, .png"
                required
              />
            </Button>
            <Box sx={{ pb: 1, fontWeight: 700, color: "#aaa" }}>
              Preview Image
            </Box>
            <Box
              sx={{
                width: "100%",
                minHeight: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #222",
                borderRadius: 2,
                background: "#181a23",
                p: 1,
              }}
            >
              {file ? (
                <img
                  src={file}
                  alt="Sponsored Post Preview"
                  style={{
                    width: "100%",
                    maxWidth: 240,
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                  loading="lazy"
                />
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: "#555", fontWeight: 400 }}
                >
                  No image selected
                </Typography>
              )}
            </Box>
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
                background: "#22263a",
                boxShadow: "none",
                "&:hover": { background: "#1976d2" },
              }}
            >
              Create Sponsored
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateSponsoredPost;
