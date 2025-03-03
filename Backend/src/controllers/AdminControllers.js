import db from "../../Utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import {
  // admin
  adminLoginData,
  // team member
  allTeamMemberQuery,
  teamMemberToDeleteQuery,
  createTeamMemberQuery,
  editTeamMemberIDQuery,
  editTeamMemberQuery,
  // podcast
  allPodcastsQuery,
  PodcastsToDeleteQuery,
  createPodcastsQuery,
  editPodcastsIDQuery,
  editPodcastsQuery,
  // blogPost
  createBlogPostQuery,
  allBlogPostQuery,
  editBlogPostQuery,
  BlogPostToDeleteQuery,
  editBlogPostIdQuery,
  getBlogPostByIdQuery,
  // tagName
  createTagNameQuery,
  allTagNameQuery,
  TagNameToDeleteQuery,
  editTagNameQuery,
  editTagNameIdQuery,
  // patner image
  memberImageCreateQuery,
  memberImageQuery,
  memberImageDeleteQuery,
  // clint nesletter
  submitedNewsLetterEmailQuery,
  AllClientNewsLetterEmailQuery,
  clientNewsLetterEmailToDeleteQuery,
  // clientNewsLetterEmailToShowQuery,
  // appointment
  appointmentContactNameQuery,
  createAppointmentQuery,
  AllAppointmentQuery,
  showAppointmentQuery,
  editAppointmentQuery,
  // contact list
  createContactlistQuery,
  allContactlistQuery,
  contactlistToDeleteQuery,
  showContactInfoQuery,
  editContactlistQuery,
  // author
  createAuthorQuery,
  getAuthorQuery,
  deleteOneAuthorQuery,
  editAuthorQuery,
  showAuthorIdQuery,
  // news category
  createNewsCategoryQuery,
  getNewsCategoryQuery,
  deleteOneNewsCategoryQuery,
  showNewsCategoryIdQuery,
  editNewsCategoryQuery,
  // clinet list
  createClientListQuery,
  getClientListQuery,
  showClientListIdQuery,
  deleteOneClientListQuery,
  editClientListQuery,
  // job post
  createJobPostQuery,
  allJobPostQuery,
  editJobPostIdQuery,
  editJobPostQuery,
  jobPostToDeleteQuery,
  // episode
  EpisodesToDeleteQuery,
  editEpisodesIdQuery,
  editEpisodesQuery,
  allEpisodesQuery,
  createEpisodesQuery,
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
  const imageFile = req.file.filename;

  const values = [
    uuidv4(),
    req.body.title,
    req.body.permalink,
    req.body.subTitle,
    req.body.AuthorOne,
    req.body.AuthorTwo || null,
    req.body.newsCategory,
    imageFile,
    req.body.artical,
    currentDate,
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
  const currentDate = new Date();
  const id = req.params.id;
  const newImage = req.file ? req.file.filename : req.body.file;
  const values = [
    req.body.title,
    req.body.permalink,
    req.body.subTitle,
    req.body.AuthorOne,
    req.body.AuthorTwo || null,
    req.body.newsCategory,
    newImage,
    req.body.artical,
    currentDate,
  ];

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

const getBlogPostById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ Status: false, Error: "Invalid ID format" });
  }

  db.query(getBlogPostByIdQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ Status: false, Error: "Blog post not found" });
    }

    return res.json({ Status: true, Result: result[0] });
  });
};

const BlogPostToDelete = (req, res) => {
  const id = req.params.id;
  const deleteFileQuery = "SELECT thumble FROM blognews WHERE uuid = ?";
  // Get the filename before deleting
  db.query(deleteFileQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ Status: false, Error: "Record not found" });
    }
    const filename = result[0].thumble;

    // Determine the folder based on the file extension or MIME type
    let folder;
    const fileExtension = path.extname(filename).toLowerCase();
    if (
      fileExtension === ".jpg" ||
      fileExtension === ".jpeg" ||
      fileExtension === ".png"
    ) {
      folder = "public/Images";
    } else {
      return res
        .status(400)
        .json({ Status: false, Error: "Invalid file type" });
    }

    const filepath = path.join(folder, filename);

    fs.unlink(filepath, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ Status: false, Error: "File Deletion Error" });
      }

      db.query(BlogPostToDeleteQuery, [id], (err, result) => {
        if (err) {
          return res.status(500).json({ Status: false, Error: "Query Error" });
        }

        res.json({
          Status: true,
          message: "File deleted and data removed.",
          Result: result,
        });
      });
    });
  });
};

// job post router
const createJobPost = (req, res) => {
  const uuid = uuidv4();
  const values = [
    uuid,
    req.body.jobTitle,
    req.body.jobPosition,
    req.body.jobTime,
    req.body.applyLink,
  ];
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

const editJobPostID = (req, res) => {
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
  const values = [
    req.body.jobTitle,
    req.body.jobPosition,
    req.body.jobTime,
    req.body.applyLink,
  ];
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

// TagName Router
const createTagName = (req, res) => {
  const uuid = uuidv4();
  const values = [uuid, req.body.TagName];
  db.query(createTagNameQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const allTagName = (req, res) => {
  db.query(allTagNameQuery, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};

const editTagNameId = (req, res) => {
  const id = req.params.id;
  db.query(editTagNameIdQuery, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Qurey Erro" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};
const editTagName = (req, res) => {
  const id = req.params.id;
  const values = [req.body.TagName];
  db.query(editTagNameQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const TagNameToDelete = (req, res) => {
  const id = req.params.uuid;

  db.query(TagNameToDeleteQuery, [id], (err, result) => {
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

// Podcasts Router
const createPodcasts = (req, res) => {
  const imageFile = req.file.filename;

  const values = [
    uuidv4(),
    req.body.HostedName,
    req.body.HostedInfo,
    imageFile,
    req.body.SpotifyUrl,
    req.body.AppleUrl,
  ];
  db.query(createPodcastsQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const allPodcasts = (req, res) => {
  db.query(allPodcastsQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const PodcastsToDelete = (req, res) => {
  const uuid = req.params.uuid;
  db.query(PodcastsToDeleteQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

const editPodcastsID = (req, res) => {
  const id = req.params.id;
  db.query(editPodcastsIDQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

const editPodcasts = (req, res) => {
  const id = req.params.id;
  const values = [
    req.body.HostedName,
    req.body.HostedInfo,
    req.body.SpotifyUrl,
    req.body.AppleUrl,
  ];
  db.query(editPodcastsQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

// client NewsLetterEmail Router
const submitedNewsLetterEmail = (req, res) => {
  const values = [uuidv4(), req.body.email];
  db.query(submitedNewsLetterEmailQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const AllClientNewsLetterEmail = (req, res) => {
  db.query(AllClientNewsLetterEmailQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const clientNewsLetterEmailToDelete = (req, res) => {
  const uuid = req.params.id;
  db.query(clientNewsLetterEmailToDeleteQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

// const clientNewsLetterEmailToShow = (req, res) => {
//   const uuid = req.params.id;
//   db.query(clientNewsLetterEmailToShowQuery, [uuid], (err, result) => {
//     if (err) return res.json({ Status: false, Error: "Query Error" + err });
//     return res.json({ Status: true, Result: result });
//   });
// };

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

// Author
const createAuthor = (req, res) => {
  const values = [uuidv4(), req.body.authorName];
  db.query(createAuthorQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const getAuthor = (req, res) => {
  db.query(getAuthorQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const deleteOneAuthor = (req, res) => {
  const uuid = req.params.id;
  db.query(deleteOneAuthorQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

const editAuthor = (req, res) => {
  const id = [req.params.id];
  const values = [req.body.authorName];
  db.query(editAuthorQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

const showAuthorId = (req, res) => {
  const id = [req.params.id];
  db.query(showAuthorIdQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

// News Catagory Admin Control
const createNewsCategory = (req, res) => {
  const values = [
    uuidv4(),
    req.body.categoryName,
    // req.body.OnBehalf,
  ];
  db.query(createNewsCategoryQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const getNewsCategory = (req, res) => {
  db.query(getNewsCategoryQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const deleteOneNewsCategory = (req, res) => {
  const uuid = req.params.id;
  db.query(deleteOneNewsCategoryQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};
const showNewsCategoryId = (req, res) => {
  const id = [req.params.id];
  db.query(showNewsCategoryIdQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const editNewsCategory = (req, res) => {
  const id = [req.params.id];
  const values = [
    req.body.categoryName,
    // req.body.categoryNote,
    // req.body.OnBehalf,
  ];
  db.query(editNewsCategoryQuery, [...values, id], (err, result) => {
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

//Episodes Router
const createEpisodes = (req, res) => {
  // Generate the current date and time
  const currentDate = new Date();
  const audioFile = req.file.filename;

  const values = [
    uuidv4(),
    req.body.PodcastPovider,
    currentDate,
    req.body.episodesInfo,
    req.body.title,
    audioFile,
  ];

  db.query(createEpisodesQuery, [values], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};

const allEpisodes = (req, res) => {
  db.query(allEpisodesQuery, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
};

const editEpisodes = (req, res) => {
  const currentDate = new Date();
  const id = req.params.id;

  // Check if a new file is being uploaded
  const newAudioFile = req.file ? req.file.filename : null;

  if (newAudioFile) {
    const deleteFileQuery = "SELECT audioFile FROM episodes WHERE uuid = ?";

    // Get the filename before deleting
    db.query(deleteFileQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ Status: false, Error: "Query Error" });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ Status: false, Error: "Record not found" });
      }
      const filename = result[0].audioFile;

      // Determine the folder based on the file extension or MIME type
      let folder;
      const fileExtension = path.extname(filename).toLowerCase();

      if (
        fileExtension === ".mp3" ||
        fileExtension === ".wav" ||
        fileExtension === ".ogg"
      ) {
        folder = "public/Audio";
      } else {
        return res
          .status(400)
          .json({ Status: false, Error: "Invalid file type" });
      }

      const filepath = path.join(folder, filename);

      // Check if the file exists before attempting to delete it
      fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
          console.warn(`File does not exist, skipping deletion: ${filepath}`);
          // Continue with updating the database
          updateEpisodeData(id, newAudioFile);
        } else {
          fs.unlink(filepath, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ Status: false, Error: "File Deletion Error" });
            }

            // After file is deleted, update the database
            updateEpisodeData(id, newAudioFile);
          });
        }
      });
    });
  } else {
    // If no new file is uploaded, just update the database with existing data
    const existingFileQuery = "SELECT audioFile FROM episodes WHERE uuid = ?";
    db.query(existingFileQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ Status: false, Error: "Query Error" });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ Status: false, Error: "Record not found" });
      }

      const existingAudioFile = result[0].audioFile;
      updateEpisodeData(id, existingAudioFile);
    });
  }

  const updateEpisodeData = (episodeId, audioFile) => {
    const values = [
      req.body.PodcastPovider,
      currentDate,
      req.body.episodesInfo,
      req.body.title,
      audioFile,
    ];

    db.query(editEpisodesQuery, [...values, episodeId], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true, Result: result });
    });
  };
};

const editEpisodesId = (req, res) => {
  const id = req.params.id;
  db.query(editEpisodesIdQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

const EpisodesToDelete = (req, res) => {
  const id = req.params.id;
  const deleteFileQuery = "SELECT audioFile FROM episodes WHERE uuid = ?";
  // Get the filename before deleting
  db.query(deleteFileQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ Status: false, Error: "Record not found" });
    }
    const filename = result[0].audioFile;

    // Determine the folder based on the file extension or MIME type
    let folder;
    const fileExtension = path.extname(filename).toLowerCase();

    if (
      fileExtension === ".mp3" ||
      fileExtension === ".wav" ||
      fileExtension === ".ogg"
    ) {
      folder = "public/Audio";
    } else {
      return res
        .status(400)
        .json({ Status: false, Error: "Invalid file type" });
    }

    const filepath = path.join(folder, filename);

    fs.unlink(filepath, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ Status: false, Error: "File Deletion Error" });
      }
    });
  });

  db.query(EpisodesToDeleteQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }

    res.json({
      Status: true,
      message: "File deleted and data removed.",
      Result: result,
    });
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
};
