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

//FaqQuery
const createFaqQuery = `INSERT INTO faq (uuid, question , answer) VALUES ( ? )`;
const allFaqQuery = `SELECT * FROM faq ORDER BY faq.ID ASC`;
const editFaqIdQuery = `SELECT * FROM faq WHERE uuid = ?`;
const editFaqQuery = `UPDATE faq SET question = ?, answer = ?  WHERE uuid = ?`;
const faqToDeleteQuery = `DELETE FROM faq WHERE uuid = ?`;

// Blog  Area
const createBlogPostQuery = `INSERT INTO blog (uuid, blogtitle, blogImg , description , authorName , timestamp_column) VALUES ( ? )`;
const allBlogPostQuery = `SELECT * FROM blog ORDER BY blog.ID DESC`;
const editBlogPostQuery = `UPDATE blog SET blogtitle = ?, blogImg = ?, description = ? , authorName=? Where uuid = ?`;
const editBlogPostIdQuery = `SELECT * FROM blog WHERE uuid = ?`;
const BlogPostToDeleteQuery = `DELETE FROM blog WHERE uuid = ?`;

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

//Contact CatagoryList Query,
const createContactCatagoryListQuery = `INSERT INTO contact_category_list(uuid , categoryName , categoryNote) VALUES(?) `;
const getContactCatagoryListQuery = `SELECT * FROM contact_category_list`;
const deleteOneContactCatagoryListQuery = `DELETE FROM contact_category_list WHERE uuid = ?`;
const editContactCatagoryListQuery = `UPDATE contact_category_list SET categoryName = ?, categoryNote = ?  WHERE uuid = ?`;
const showContactCatagoryListIdQuery = `SELECT * FROM contact_category_list WHERE uuid = ?`;

//clinet CatagoryList Query,
const createClientCatagoryListQuery = `INSERT INTO client_category_list(uuid , categoryName , categoryNote, OnBehalf ) VALUES(?) `;
const getClientCatagoryListQuery = `SELECT * FROM client_category_list`;
const deleteOneClientCatagoryListQuery = `DELETE FROM client_category_list WHERE uuid = ?`;
const editClientCatagoryListQuery = `UPDATE client_category_list SET categoryName = ?, categoryNote = ? , OnBehalf=?  WHERE uuid = ?`;
const showClientCatagoryListIdQuery = `SELECT * FROM client_category_list WHERE uuid = ?`;

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
  allFaqQuery,
  faqToDeleteQuery,
  editFaqIdQuery,
  editFaqQuery,
  createFaqQuery,
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
};
