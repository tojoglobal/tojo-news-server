import db from "../../Utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import {
  adminLoginData,
  allTeamMemberQuery,
  teamMemberToDeleteQuery,
  createTeamMemberQuery,
  editTeamMemberIDQuery,
  createBlogPostQuery,
  editTeamMemberQuery,
  allBlogPostQuery,
  editBlogPostQuery,
  BlogPostToDeleteQuery,
  editBlogPostIdQuery,
  createFaqQuery,
  allFaqQuery,
  faqToDeleteQuery,
  editFaqQuery,
  editFaqIdQuery,
  memberImageCreateQuery,
  memberImageQuery,
  memberImageDeleteQuery,
  submitedMessageQuery,
  AllClientMessageQuery,
  clientMessageToDeleteQuery,
  clientMessageToShowQuery,
  appointmentContactNameQuery,
  createAppointmentQuery,
  AllAppointmentQuery,
  showAppointmentQuery,
  editAppointmentQuery,
  createContactlistQuery,
  allContactlistQuery,
  contactlistToDeleteQuery,
  showContactInfoQuery,
  editContactlistQuery,
  createContactCatagoryListQuery,
  getContactCatagoryListQuery,
  deleteOneContactCatagoryListQuery,
  editContactCatagoryListQuery,
  showContactCatagoryListIdQuery,
  createClientCatagoryListQuery,
  getClientCatagoryListQuery,
  deleteOneClientCatagoryListQuery,
  showClientCatagoryListIdQuery,
  editClientCatagoryListQuery,
  createClientListQuery,
  getClientListQuery,
  showClientListIdQuery,
  deleteOneClientListQuery,
  editClientListQuery,
  createJobPostQuery,
  allJobPostQuery,
  editJobPostIdQuery,
  editJobPostQuery,
  jobPostToDeleteQuery
} from "../models/AdminModel.js";

const adminLogin = (req, res) => {
  db.query(
    adminLoginData,
    [req.body.email, req.body.password],
    (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email, id: result[0].id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        return res.json({ loginStatus: true });
      } else {
        return res.json({
          loginStatus: false,
          Error: "Wrong email or password",
        });
      }
    }
  );
};

// Blog Post Router
const createBlogPost = (req, res) => {
  // Generate the current date and time
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " "); // Format to 'YYYY-MM-DD HH:MM:SS'

  const imageFile = req.file.filename;
  const values = [
    uuidv4(),
    req.body.title,
    imageFile,
    req.body.artical,
    req.body.authorName,
    formattedDate,
  ];
  db.query(createBlogPostQuery, [values], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};

const allBlogPost = (req, res) => {
  db.query(allBlogPostQuery, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};

const editBlogPost = (req, res) => {
  const id = req.params.id;
  // const newImage = req.file ? req.file.filename : null;
  //  const imageFile = req.file ? req.file.filename : req.body.file;
  const values = [
    req.body.title,
    req.body.file,
    // newImage,
    req.body.artical,
    req.body.authorName,
  ];
  
  console.log(values);

  db.query(editBlogPostQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const editBlogPostId = (req, res) => {
  const id = req.params.id;
  db.query(editBlogPostIdQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

const BlogPostToDelete = (req, res) => {
  const id = req.params.id;
  db.query(BlogPostToDeleteQuery, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Qurey Erro" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};

// job post router
const createJobPost = (req, res) => {
  const uuid = uuidv4();
  const values = [uuid, req.body.jobTitle, req.body.jobPosition , req.body.jobTime , req.body.applyLink];
  db.query(createJobPostQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const allJobPost = (req, res) => {
  db.query(allJobPostQuery, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};

const  editJobPostID = (req, res) => {
  const id = req.params.id;
  db.query(editJobPostIdQuery, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Qurey Erro" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};
const editJobPost = (req, res) => {
  const id = req.params.id;
  const values = [req.body.jobTitle, req.body.jobPosition , req.body.jobTime , req.body.applyLink];
  db.query(editJobPostQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const jobPostToDelete = (req, res) => {
  const id = req.params.uuid;

  db.query(jobPostToDeleteQuery, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Qurey Erro" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};


// Faq Router
const createFaq = (req, res) => {
  const uuid = uuidv4();
  const values = [uuid, req.body.question, req.body.answer];
  db.query(createFaqQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const allFaq = (req, res) => {
  db.query(allFaqQuery, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};

const editFaqId = (req, res) => {
  const id = req.params.id;
  db.query(editFaqIdQuery, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Qurey Erro" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};
const editFaq = (req, res) => {
  const id = req.params.id;
  const values = [req.body.question, req.body.answer];
  db.query(editFaqQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const faqToDelete = (req, res) => {
  const id = req.params.uuid;

  db.query(faqToDeleteQuery, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Qurey Erro" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};

// member route
const allMember = (req, res) => {
  db.query(memberImageQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

const uploadMemberImage = (req, res) => {
  const uuid = uuidv4();
  const values = [uuid, req.file.filename, req.body.ImageTitle];
  db.query(memberImageCreateQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true });
  });
};

const memberToDelete = (req, res) => {
  const uuid = req.params.uuid;
  db.query(memberImageDeleteQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

// Team Member Router
const createTeamMember = (req, res) => {
  const values = [
    uuidv4(),
    req.body.name,
    req.body.positionName,
    req.file.filename,
    req.body.BioData,
    req.body.facebookName,
    req.body.linkedinName,
    req.body.twitterName,
    req.body.WhatsAppNumber,
    req.body.youtubeName,
  ];
  db.query(createTeamMemberQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const allTeamMember = (req, res) => {
  db.query(allTeamMemberQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
teamMemberToDeleteQuery;

const teamMemberToDelete = (req, res) => {
  const uuid = req.params.uuid;
  db.query(teamMemberToDeleteQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

const editTeamMemberID = (req, res) => {
  const id = req.params.id;
  db.query(editTeamMemberIDQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

const editTeamMember = (req, res) => {
  const id = req.params.id;
  const values = [
    req.body.name,
    req.body.positionName,
    req.body.BioData,
    req.body.facebookName,
    req.body.linkedinName,
    req.body.twitterName,
    req.body.WhatsAppNumber,
    req.body.youtubeName,
  ];

  db.query(editTeamMemberQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

// client Message Router
const submitedMessage = (req, res) => {
  const values = [
    uuidv4(),
    req.body.fullName,
    req.body.email,
    req.body.phoneNumber,
    req.body.subject,
    req.body.message,
  ];
  console.log(values);
  db.query(submitedMessageQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const AllClientMessage = (req, res) => {
  db.query(AllClientMessageQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const clientMessageToDelete = (req, res) => {
  const uuid = req.params.id;
  db.query(clientMessageToDeleteQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};
const clientMessageToShow = (req, res) => {
  const uuid = req.params.id;
  db.query(clientMessageToShowQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

// Appointment Router
const appointmentContactName = (req, res) => {
  db.query(appointmentContactNameQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const AllAppointment = (req, res) => {
  db.query(AllAppointmentQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const createAppointment = (req, res) => {
  const values = [
    uuidv4(),
    req.body.ProblemTitle,
    req.body.ContactName,
    req.body.datePicker,
    req.body.reason,
    req.body.note,
    req.body.timePicker,
  ];
  db.query(createAppointmentQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const showAppointment = (req, res) => {
  const id = [req.params.id];
  db.query(showAppointmentQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const editAppointment = (req, res) => {
  const id = [req.params.id];
  const values = [
    req.body.ProblemTitle,
    req.body.ContactName,
    req.body.datePicker,
    req.body.reason,
    req.body.note,
    req.body.timePicker,
  ];

  db.query(editAppointmentQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

// Contact List route
const createContactlist = (req, res) => {
  const values = [
    uuidv4(),
    req.body.contactName,
    req.body.category,
    req.body.mobileNo,
    req.body.email,
    req.body.note,
  ];
  db.query(createContactlistQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const allContactlist = (req, res) => {
  db.query(allContactlistQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const contactlistToDelete = (req, res) => {
  const uuid = req.params.id;
  db.query(contactlistToDeleteQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

const showContactInfo = (req, res) => {
  const id = [req.params.id];
  db.query(showContactInfoQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const editContactlist = (req, res) => {
  const id = [req.params.id];
  const values = [
    req.body.contactName,
    req.body.category,
    req.body.mobileNo,
    req.body.email,
    req.body.note,
  ];
  db.query(editContactlistQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

// Contact Catagory List
const createContactCatagoryList = (req, res) => {
  const values = [uuidv4(), req.body.categoryName, req.body.categoryNote];
  db.query(createContactCatagoryListQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const getContactCatagoryList = (req, res) => {
  db.query(getContactCatagoryListQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const deleteOneContactCatagoryList = (req, res) => {
  const uuid = req.params.id;
  db.query(deleteOneContactCatagoryListQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

const editContactCatagoryList = (req, res) => {
  const id = [req.params.id];
  const values = [req.body.categoryName, req.body.categoryNote];
  db.query(editContactCatagoryListQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const showContactCatagoryListId = (req, res) => {
  const id = [req.params.id];
  db.query(showContactCatagoryListIdQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

// Client Catagory List router
const createClientCatagoryList = (req, res) => {
  const values = [
    uuidv4(),
    req.body.categoryName,
    req.body.categoryNote,
    req.body.OnBehalf,
  ];
  db.query(createClientCatagoryListQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const getClientCatagoryList = (req, res) => {
  db.query(getClientCatagoryListQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const deleteOneClientCatagoryList = (req, res) => {
  const uuid = req.params.id;
  db.query(deleteOneClientCatagoryListQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};
const showClientCatagoryListId = (req, res) => {
  const id = [req.params.id];
  db.query(showClientCatagoryListIdQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const editClientCatagoryList = (req, res) => {
  const id = [req.params.id];
  const values = [
    req.body.categoryName,
    req.body.categoryNote,
    req.body.OnBehalf,
  ];
  db.query(editClientCatagoryListQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

// Client List router
const createClientList = (req, res) => {
  const values = [
    uuidv4(),
    req.body.clientName,
    req.body.clientmobile,
    req.body.clientemail,
    req.body.gender,
    req.body.clientCategory,
    req.body.clientCountryCode,
    req.body.clientStateCode,
    req.body.clientCity,
    req.body.clientAddress,
    req.body.note,
  ];
  db.query(createClientListQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const getClientList = (req, res) => {
  db.query(getClientListQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const deleteOneClientList = (req, res) => {
  const uuid = req.params.id;
  db.query(deleteOneClientListQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};
const showClientListId = (req, res) => {
  const id = [req.params.id];
  db.query(showClientListIdQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const editClientList = (req, res) => {
  const id = [req.params.id];
  const values = [
    req.body.clientName,
    req.body.clientmobile,
    req.body.clientemail,
    req.body.gender,
    req.body.clientCategory,
    req.body.clientCountryCode,
    req.body.clientStateCode,
    req.body.clientCity,
    req.body.clientAddress,
    req.body.note,
  ];
  db.query(editClientListQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

// Many Counts Number
const clinetCounts = (req, res) => {
  const sql = `SELECT count(uuid) AS totalClient FROM clientlist;`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

const teamMemberCount = (req, res) => {
  const sql = `SELECT count(uuid) AS totalTeamMember FROM team_member;`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

const contactCount = (req, res) => {
  const sql = `SELECT count(uuid) AS totalContact FROM contactlist;`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

// LOGOUT Route
const adminLogout = (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
};

export {
  adminLogin,
  editTeamMember,
  allTeamMember,
  teamMemberToDelete,
  editTeamMemberID,
  createTeamMember,
  createBlogPost,
  allBlogPost,
  editBlogPost,
  editBlogPostId,
  BlogPostToDelete,
  createFaq,
  editFaqId,
  faqToDelete,
  allFaq,
  editFaq,
  adminLogout,
  uploadMemberImage,
  allMember,
  memberToDelete,
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
  createContactCatagoryList,
  getContactCatagoryList,
  deleteOneContactCatagoryList,
  editContactCatagoryList,
  showContactCatagoryListId,
  createClientCatagoryList,
  getClientCatagoryList,
  deleteOneClientCatagoryList,
  showClientCatagoryListId,
  editClientCatagoryList,
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
  editJobPost
};
