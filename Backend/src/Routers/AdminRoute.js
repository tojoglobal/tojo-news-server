import express from "express";
import {
  // adminLogin,
  // blogpost
  createBlogPost,
  allBlogPost,
  editBlogPost,
  editBlogPostId,
  getBlogPostById,
  BlogPostToDelete,
  // episodes
  createEpisodes,
  allEpisodes,
  editEpisodes,
  editEpisodesId,
  EpisodesToDelete,

  // tagName
  createTagName,
  allTagName,
  editTagNameId,
  TagNameToDelete,
  editTagName,
  // member
  memberToDelete,
  uploadMemberImage,
  allMember,
  adminLogout,
  // team member
  createTeamMember,
  allTeamMember,
  teamMemberToDelete,
  editTeamMemberID,
  editTeamMember,
  // prodcasts
  createPodcasts,
  allPodcasts,
  PodcastsToDelete,
  editPodcastsID,
  editPodcasts,
  // Nesletter
  submitedNewsLetterEmail,
  AllClientNewsLetterEmail,
  clientNewsLetterEmailToDelete,
  // clientNewsLetterEmailToShow,
  // appoinment
  appointmentContactName,
  createAppointment,
  AllAppointment,
  showAppointment,
  editAppointment,
  // contact list
  createContactlist,
  allContactlist,
  contactlistToDelete,
  showContactInfo,
  editContactlist,
  // author
  createAuthor,
  getAuthor,
  deleteOneAuthor,
  editAuthor,
  showAuthorId,
  // nws category
  createNewsCategory,
  getNewsCategory,
  deleteOneNewsCategory,
  showNewsCategoryId,
  editNewsCategory,
  // clinet list
  createClientList,
  getClientList,
  showClientListId,
  deleteOneClientList,
  editClientList,
  // count
  clinetCounts,
  teamMemberCount,
  contactCount,
  // job post
  createJobPost,
  allJobPost,
  jobPostToDelete,
  editJobPostID,
  editJobPost,
  createSponsoredPost,
  allSponsoredPost,
  getSponsoredPostById,
  SponsoredPostToDelete,
  editSponsoredPost,
} from "../controllers/AdminControllers.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// Set storage engine
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;
    if (file.mimetype.startsWith("image/")) {
      folder = "public/Images";
    } else if (file.mimetype.startsWith("audio/")) {
      folder = "public/Audio";
    } else {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const name = uuidv4() + "_" + Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

// Initialize upload
const upload = multer({
  storage: fileStorage,
  dest: "uploads/",
});

// end image and audio uplode

// admin route
const AdminRouter = express.Router();

// admin login
// AdminRouter.post("/adminlogin", adminLogin);

// Blog Router
AdminRouter.post("/blogpost/create", upload.single("file"), createBlogPost);
AdminRouter.get("/blogpost", allBlogPost);
AdminRouter.put("/blogpost/edit/:id", upload.single("file"), editBlogPost);
AdminRouter.get("/blogpost/:id", editBlogPostId);
AdminRouter.get("/blogpostbyid/:id", getBlogPostById);
AdminRouter.delete("/blogpost/delete/:id", BlogPostToDelete);

// Sponsored Post
AdminRouter.post(
  "/Sponsored/create",
  upload.single("file"),
  createSponsoredPost
);
AdminRouter.get("/Sponsored", allSponsoredPost);
AdminRouter.put(
  "/Sponsored/edit/:id",
  upload.single("file"),
  editSponsoredPost
);
AdminRouter.get("/Sponsoredbyid/:id", getSponsoredPostById);
AdminRouter.delete("/Sponsored/delete/:id", SponsoredPostToDelete);

// job post
AdminRouter.post("/jobPost/create", createJobPost);
AdminRouter.get("/jobPost", allJobPost);
AdminRouter.delete("/jobPost/delete/:uuid", jobPostToDelete);
AdminRouter.get("/jobPost/:id", editJobPostID);
AdminRouter.put("/jobPost/edit/:id", editJobPost);

// Team Member
AdminRouter.post("/teamMember/create", upload.single("file"), createTeamMember);
AdminRouter.get("/teamMember", allTeamMember);
AdminRouter.delete("/teamMember/delete/:uuid", teamMemberToDelete);
AdminRouter.get("/teamMember/:id", editTeamMemberID);
AdminRouter.put("/teamMember/edit/:id", editTeamMember);

// Podcasts
AdminRouter.post("/Podcasts/create", upload.single("file"), createPodcasts);
AdminRouter.get("/Podcasts", allPodcasts);
AdminRouter.delete("/Podcasts/delete/:uuid", PodcastsToDelete);
AdminRouter.get("/Podcasts/:id", editPodcastsID);
AdminRouter.put("/Podcasts/edit/:id", editPodcasts);

// allMember
AdminRouter.get("/member", allMember);
AdminRouter.post("/member/create", upload.single("file"), uploadMemberImage);
AdminRouter.delete("/member/delete/:uuid", memberToDelete);

// TagName Router
AdminRouter.post("/TagName/create", createTagName);
AdminRouter.get("/TagName", allTagName);
AdminRouter.get("/TagName/:id", editTagNameId);
AdminRouter.put("/TagName/edit/:id", editTagName);
AdminRouter.delete("/TagName/delete/:uuid", TagNameToDelete);

// Blog Router
AdminRouter.post("/Episodes/create", upload.single("file"), createEpisodes);
AdminRouter.get("/Episodes", allEpisodes);
AdminRouter.put("/Episodes/edit/:id", upload.single("file"), editEpisodes);
AdminRouter.get("/Episodes/:id", editEpisodesId);
AdminRouter.delete("/Episodes/delete/:id", EpisodesToDelete);

// clientNewsLetterEmail
AdminRouter.post("/newsletteremail/submite", submitedNewsLetterEmail);
AdminRouter.get("/newsletteremail", AllClientNewsLetterEmail);
AdminRouter.delete(
  "/newsletteremail/delete/:id",
  clientNewsLetterEmailToDelete
);
// AdminRouter.get("/clientNewsLetterEmail/:id", clientNewsLetterEmailToShow);

//Appointment Route
AdminRouter.get("/contactName", appointmentContactName);
AdminRouter.post("/appointment/create", createAppointment);
AdminRouter.get("/appointment/:id", showAppointment);
AdminRouter.get("/appointment", AllAppointment);
AdminRouter.put("/appointment/edit/:id", editAppointment);

// Conatct list Route
AdminRouter.post("/contactlist/create", createContactlist);
AdminRouter.get("/contactlist", allContactlist);
AdminRouter.get("/contactlist/:id", showContactInfo);
AdminRouter.delete("/contactlist/delete/:id", contactlistToDelete);
AdminRouter.put("/contactlist/edit/:id", editContactlist);

// Contact Category Route
AdminRouter.post("/author/create", createAuthor);
AdminRouter.get("/author", getAuthor);
AdminRouter.get("/author/:id", showAuthorId);
AdminRouter.delete("/author/delete/:id", deleteOneAuthor);
AdminRouter.put("/author/edit/:id", editAuthor);

// client List Route
AdminRouter.post("/clientlist/create", createClientList);
AdminRouter.get("/clientlist", getClientList);
AdminRouter.get("/clientlist/:id", showClientListId);
AdminRouter.delete("/clientlist/delete/:id", deleteOneClientList);
AdminRouter.put("/clientlist/edit/:id", editClientList);

// News Category Route
AdminRouter.post("/newsCategory/create", createNewsCategory);
AdminRouter.get("/newsCategory", getNewsCategory);
AdminRouter.get("/newsCategory/:id", showNewsCategoryId);
AdminRouter.delete("/newsCategory/delete/:id", deleteOneNewsCategory);
AdminRouter.put("/newsCategory/edit/:id", editNewsCategory);

// count many Route
AdminRouter.get("/client-count", clinetCounts);
AdminRouter.get("/teamMember-count", teamMemberCount);
AdminRouter.get("/contact-count", contactCount);

AdminRouter.get("/logout", adminLogout);
export { AdminRouter as AdminRouters };
