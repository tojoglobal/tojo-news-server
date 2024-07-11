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

const allBlogPostQuery = `SELECT * FROM blognews ORDER BY blognews.ID DESC`;
const editBlogPostQuery = `UPDATE blognews SET title = ?, subtitle = ?, author1_id = ? , author2_id = ?, category_id = ?, thumble = ?, articalpost = ?, dateAndTime = ? Where uuid = ?`;
const editBlogPostIdQuery = `SELECT * FROM blognews WHERE uuid = ?`;
const BlogPostToDeleteQuery = `DELETE FROM blognews WHERE uuid = ?`;

// Team member
const createTeamMemberQuery = `INSERT INTO team_member ( uuid, name, position , img , BioData, FBurl,LIurl, TWurl , WhatsApurl , YTurl) VALUES ( ? )`;
const allTeamMemberQuery = `SELECT * FROM team_member ORDER BY team_member.ID DESC`;
const teamMemberToDeleteQuery = `DELETE FROM team_member WHERE uuid = ?`;
const editTeamMemberIDQuery = `SELECT * FROM team_member WHERE uuid = ?`;
const editTeamMemberQuery = `UPDATE team_member SET name = ? , position=? , BioData=?,FBurl=?,LIurl=?, TWurl=? , WhatsApurl=? , YTurl=? WHERE uuid = ?`;

// client Message Query
const submitedMessageQuery = `INSERT INTO clientmessage (uuid, Name, Email , phoneNumber , Subject , message ) VALUES ( ? )`;
const AllClientMessageQuery = `SELECT * FROM clientmessage ORDER BY clientmessage.ID DESC`;
const clientMessageToDeleteQuery = `DELETE FROM clientmessage WHERE uuid = ?`;
const clientMessageToShowQuery = `SELECT * FROM clientmessage WHERE uuid = ?`;

// Appointment Query
const AllAppointmentQuery =
  "SELECT * FROM appointment  ORDER BY appointment.ID DESC";
const appointmentContactNameQuery = "SELECT  uuid , Name  FROM clientmessage";
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
const getNewsCategoryQuery = `SELECT * FROM categories ORDER BY categories.ID DESC`;
const deleteOneNewsCategoryQuery = `DELETE FROM categories WHERE uuid = ?`;
const editNewsCategoryQuery = `UPDATE categories SET name = ? WHERE uuid = ?`;
const showNewsCategoryIdQuery = `SELECT * FROM categories WHERE uuid = ?`;

//clinet List Query,
const createClientListQuery = `INSERT INTO clientlist(uuid , clientName , clientmobile, clientemail, gender, clientCategory, clientCountryCode, clientStateCode, clientCity,  clientAddress, note) VALUES(?) `;
const getClientListQuery = `SELECT * FROM clientlist ORDER BY clientlist.ID DESC`;
const deleteOneClientListQuery = `DELETE FROM clientlist WHERE uuid = ?`;
const editClientListQuery = `UPDATE clientlist SET clientName = ?, clientmobile = ? ,  clientemail = ? , gender = ? , clientCategory = ? , clientCountryCode = ? , clientStateCode = ? , clientCity = ? , clientAddress = ? , note = ?  WHERE uuid = ?`;
const showClientListIdQuery = `SELECT * FROM clientlist WHERE uuid = ?`;

export {
  adminLoginData,
  allTeamMemberQuery,
  teamMemberToDeleteQuery,
  editTeamMemberIDQuery,
  createTeamMemberQuery,
  createBlogPostQuery,
  editTeamMemberQuery,
  allBlogPostQuery,
  editBlogPostQuery,
  BlogPostToDeleteQuery,
  editBlogPostIdQuery,
  allTagNameQuery,
  TagNameToDeleteQuery,
  editTagNameIdQuery,
  editTagNameQuery,
  createTagNameQuery,
  memberImageDeleteQuery,
  memberImageCreateQuery,
  memberImageQuery,
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
  createAuthorQuery,
  getAuthorQuery,
  deleteOneAuthorQuery,
  editAuthorQuery,
  showAuthorIdQuery,
  createNewsCategoryQuery,
  getNewsCategoryQuery,
  deleteOneNewsCategoryQuery,
  showNewsCategoryIdQuery,
  editNewsCategoryQuery,
  createClientListQuery,
  getClientListQuery,
  showClientListIdQuery,
  deleteOneClientListQuery,
  editClientListQuery,
  createJobPostQuery,
  allJobPostQuery,
  editJobPostIdQuery,
  editJobPostQuery,
  jobPostToDeleteQuery,
};
