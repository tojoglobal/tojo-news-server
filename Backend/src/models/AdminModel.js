// all sql asmin here
const adminLoginData = "SELECT * from admin Where email = ? and password = ?";

// member Query
const memberImageCreateQuery = `INSERT INTO member_firm (uuid, img, imageTitle) VALUES ( ? )`;
const memberImageQuery = "SELECT * FROM member_firm";
const memberImageDeleteQuery = `DELETE FROM member_firm WHERE uuid = ? `;

//job router query
const createJobPostQuery = `INSERT INTO jobpost (uuid, jobTitle, jobPosition , jobTime	, applyLink ) VALUES ( ? )`;
const allJobPostQuery = `SELECT * FROM jobpost ORDER BY jobpost.ID DESC`;
const editJobPostIdQuery = `SELECT * FROM jobpost WHERE uuid = ?`;
const editJobPostQuery = `UPDATE jobpost SET jobTitle = ?, jobPosition = ?, jobTime = ?, applyLink = ? WHERE uuid = ?`;
const jobPostToDeleteQuery = `DELETE FROM jobpost WHERE uuid = ?`;

//TagNameQuery
const createTagNameQuery = `INSERT INTO tags (uuid , name) VALUES ( ? )`;
const allTagNameQuery = `SELECT * FROM tags ORDER BY tags.ID ASC`;
const editTagNameIdQuery = `SELECT * FROM tags WHERE uuid = ?`;
const editTagNameQuery = `UPDATE tags SET name = ? WHERE uuid = ?`;
const TagNameToDeleteQuery = `DELETE FROM tags WHERE uuid = ?`;

// Blog  Area
const createBlogPostQuery = `INSERT INTO blognews (uuid, title, subtitle , author1_id , author2_id , category_id , thumble , articalpost , dateAndTime ) VALUES ( ? )`;

// Sponsored area
export const createSponsoredPostQuery = `
  INSERT INTO sponsored_posts 
  (title, description, image_url, start_date, end_date, published_at) 
  VALUES (?)
`;

// Update other queries to use id instead of uuid
export const allSponsoredPostQuery = `
  SELECT * FROM sponsored_posts ORDER BY published_at DESC
`;

export const editSponsoredPostQuery = `
  UPDATE sponsored_posts SET 
  title = ?, 
  description = ?, 
  image_url = ?, 
  sponsor_id = ?, 
  start_date = ?, 
  end_date = ?,
  published_at = ?
  WHERE id = ?
`;

export const SponsoredPostToDeleteQuery = `
  DELETE FROM sponsored_posts WHERE id = ?
`;

export const editSponsoredPostIdQuery = `
  SELECT * FROM sponsored_posts WHERE id = ?
`;

export const getSponsoredPostByIdQuery = `
  SELECT * FROM sponsored_posts WHERE id = ?
`;

const allBlogPostQuery = `SELECT * FROM blognews ORDER BY blognews.ID DESC`;
const editBlogPostQuery = `UPDATE blognews SET title = ?,subtitle = ?, author1_id = ? , author2_id = ?, category_id = ?, thumble = ?, articalpost = ?, dateAndTime = ? Where uuid = ?`;
const editBlogPostIdQuery = `SELECT * FROM blognews WHERE uuid = ?`;
const getBlogPostByIdQuery = `SELECT * FROM blognews WHERE ID = ?`;

const BlogPostToDeleteQuery = `DELETE FROM blognews WHERE uuid = ?`;

// Team member
const createTeamMemberQuery = `INSERT INTO team_member ( uuid, name, position , img , BioData, FBurl,LIurl, TWurl , WhatsApurl , YTurl) VALUES ( ? )`;
const allTeamMemberQuery = `SELECT * FROM team_member ORDER BY team_member.ID DESC`;
const teamMemberToDeleteQuery = `DELETE FROM team_member WHERE uuid = ?`;
const editTeamMemberIDQuery = `SELECT * FROM team_member WHERE uuid = ?`;
const editTeamMemberQuery = `UPDATE team_member SET name = ? , position=? , BioData=?,FBurl=?,LIurl=?, TWurl=? , WhatsApurl=? , YTurl=? WHERE uuid = ?`;

// Podcasts sql
const createPodcastsQuery = `INSERT INTO podcasts ( uuid, name, hostedInfo , image , spotify, apple) VALUES ( ? )`;

const allPodcastsQuery = `SELECT * FROM podcasts ORDER BY podcasts.ID DESC`;

const PodcastsToDeleteQuery = `DELETE FROM podcasts WHERE uuid = ?`;

const editPodcastsIDQuery = `SELECT * FROM podcasts WHERE uuid = ?`;

const editPodcastsQuery = `UPDATE podcasts SET name = ? , hostedInfo=? , spotify=?, apple=? WHERE uuid = ?`;

// client NewsLetterEmail Query
const submitedNewsLetterEmailQuery = `INSERT INTO newsletteremail (uuid, email) VALUES ( ? )`;
const AllClientNewsLetterEmailQuery = `SELECT * FROM newsletteremail ORDER BY newsletteremail.ID DESC`;
const clientNewsLetterEmailToDeleteQuery = `DELETE FROM newsletteremail WHERE uuid = ?`;
// const clientNewsLetterEmailToShowQuery = `SELECT * FROM newsletteremail WHERE uuid = ?`;

// Appointment Query
const AllAppointmentQuery =
  "SELECT * FROM appointment  ORDER BY appointment.ID DESC";
const appointmentContactNameQuery =
  "SELECT  uuid , Name  FROM clientNewsLetterEmail";
const createAppointmentQuery = `INSERT INTO appointment (uuid, problemTitle, contactName, ApoDate, reason, note, ApoTime) VALUES (?)`;
const showAppointmentQuery = "SELECT * FROM appointment WHERE uuid = ?";
const editAppointmentQuery = `UPDATE appointment SET problemTitle = ?, contactName = ? , ApoDate=? , reason=?, note=?,  ApoTime=? WHERE uuid = ?`;

// Contactlist Query
const createContactlistQuery = `INSERT INTO contactlist(uuid , contactName , category , mobileNo, eamil , note ) VALUES(?) `;
const allContactlistQuery = "SELECT * FROM contactlist";
const contactlistToDeleteQuery = `DELETE FROM contactlist WHERE uuid = ?`;
const showContactInfoQuery = `SELECT * FROM contactlist WHERE uuid = ?`;
const editContactlistQuery = `UPDATE contactlist SET contactName = ?, category = ? , mobileNo=? , eamil=?, note=? WHERE uuid = ?`;

//Author Query,
const createAuthorQuery = `INSERT INTO authors(uuid , name) VALUES(?) `;
const getAuthorQuery = `SELECT * FROM authors ORDER BY authors.ID ASC`;
const deleteOneAuthorQuery = `DELETE FROM authors WHERE uuid = ?`;
const editAuthorQuery = `UPDATE authors SET name = ? WHERE uuid = ?`;
const showAuthorIdQuery = `SELECT * FROM authors WHERE uuid = ?`;

//News Catagory Query,
const createNewsCategoryQuery = `INSERT INTO categories (uuid , name ) VALUES(?) `;
const getNewsCategoryQuery = `SELECT * FROM categories`;
const deleteOneNewsCategoryQuery = `DELETE FROM categories WHERE uuid = ?`;
const editNewsCategoryQuery = `UPDATE categories SET name = ? WHERE uuid = ?`;
const showNewsCategoryIdQuery = `SELECT * FROM categories WHERE uuid = ?`;

//clinet List Query,
const createClientListQuery = `INSERT INTO clientlist(uuid , clientName , clientmobile, clientemail, gender, clientCategory, clientCountryCode, clientStateCode, clientCity,  clientAddress, note) VALUES(?) `;
const getClientListQuery = `SELECT * FROM clientlist ORDER BY clientlist.ID DESC`;
const deleteOneClientListQuery = `DELETE FROM clientlist WHERE uuid = ?`;
const editClientListQuery = `UPDATE clientlist SET clientName = ?, clientmobile = ? ,  clientemail = ? , gender = ? , clientCategory = ? , clientCountryCode = ? , clientStateCode = ? , clientCity = ? , clientAddress = ? , note = ?  WHERE uuid = ?`;
const showClientListIdQuery = `SELECT * FROM clientlist WHERE uuid = ?`;

// episodes  Area
const createEpisodesQuery = `INSERT INTO episodes (uuid ,podcastID, dateAndTime , episodesInfo , title , audioFile) VALUES ( ? )`;

const allEpisodesQuery = `SELECT * FROM episodes ORDER BY episodes.ID DESC`;
const editEpisodesQuery = `UPDATE episodes SET podcastID = ?, dateAndTime = ?, episodesInfo = ?, title = ?, audioFile = ? WHERE uuid = ?`;
const editEpisodesIdQuery = `SELECT * FROM episodes WHERE uuid = ?`;

const EpisodesToDeleteQuery = `DELETE FROM episodes WHERE uuid = ?`;

export {
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
  getBlogPostByIdQuery,
  editBlogPostIdQuery,
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
};
