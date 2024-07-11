import express from "express";
import {
  adminLogin,
  createBlogPost,
  allBlogPost,
  editBlogPost,
  editBlogPostId,
  BlogPostToDelete,
  createTagName,
  allTagName,
  editTagNameId,
  TagNameToDelete,
  editTagName,
  memberToDelete,
  uploadMemberImage,
  allMember,
  adminLogout,
  createTeamMember,
  allTeamMember,
  teamMemberToDelete,
  editTeamMemberID,
  editTeamMember,
  submitedMessage,
  AllClientMessage,
  clientMessageToDelete,
  clientMessageToShow,
  appointmentContactName,
  createAppointment,
  AllAppointment,
  showAppointment,
  editAppointment,
  createContactlist,
  allContactlist,
  contactlistToDelete,
  showContactInfo,
  editContactlist,
  createAuthor,
  getAuthor,
  deleteOneAuthor,
  editAuthor,
  showAuthorId,
  createNewsCategory,
  getNewsCategory,
  deleteOneNewsCategory,
  showNewsCategoryId,
  editNewsCategory,
  createClientList,
  getClientList,
  showClientListId,
  deleteOneClientList,
  editClientList,
  clinetCounts,
  teamMemberCount,
  contactCount,
  createJobPost,
  allJobPost,
  jobPostToDelete,
  editJobPostID,
  editJobPost,
} from "../controllers/AdminControllers.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Set storage engine
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    const name = uuidv4() + "_" + Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
// Initialize upload
const upload = multer({
  storage: fileStorage,
  // limits: { fileSize: 2000000 }, // 2MB limit
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb);
  // },
  dest: "uploads/",
});
// .single('file');

// Check file type
// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }

// end image uplode

// admin route
const AdminRouter = express.Router();
AdminRouter.post("/adminlogin", adminLogin);

// job post
AdminRouter.post("/jobPost/create", createJobPost);
AdminRouter.get("/jobPost", allJobPost);
AdminRouter.delete("/jobPost/delete/:uuid", jobPostToDelete);
AdminRouter.get("/jobPost/:id", editJobPostID);
AdminRouter.put("/jobPost/edit/:id", editJobPost);

// Team Member
// upload.single("file")
AdminRouter.post("/teamMember/create", upload.single("file"), createTeamMember);
AdminRouter.get("/teamMember", allTeamMember);
AdminRouter.delete("/teamMember/delete/:uuid", teamMemberToDelete);
AdminRouter.get("/teamMember/:id", editTeamMemberID);
AdminRouter.put("/teamMember/edit/:id", editTeamMember);

// allMember
// AdminRouter.get("/member", allMember);
// AdminRouter.post("/member/create", upload.single("file"), uploadMemberImage);
// AdminRouter.delete("/member/delete/:uuid", memberToDelete);

// TagName Router
AdminRouter.post("/TagName/create", createTagName);
AdminRouter.get("/TagName", allTagName);
AdminRouter.get("/TagName/:id", editTagNameId);
AdminRouter.put("/TagName/edit/:id", editTagName);
AdminRouter.delete("/TagName/delete/:uuid", TagNameToDelete);

// Blog Router
// upload.single("file")
AdminRouter.post("/blogpost/create", upload.single("file"), createBlogPost);
AdminRouter.get("/blogpost", allBlogPost);
AdminRouter.put("/blogpost/edit/:id", upload.single("file"), editBlogPost);
AdminRouter.get("/blogpost/:id", editBlogPostId);
AdminRouter.delete("/blogpost/delete/:id", BlogPostToDelete);

// clientMessage
AdminRouter.post("/message/submited", submitedMessage);
AdminRouter.get("/clientMessage", AllClientMessage);
AdminRouter.delete("/clientMessage/delete/:id", clientMessageToDelete);
AdminRouter.get("/clientMessage/:id", clientMessageToShow);

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
