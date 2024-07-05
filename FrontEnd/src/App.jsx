import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./Component/AdminLoginPage/AdminLogin";
import Dashboard from "./Dashbord/dashbord";
import PrivateRoute from "./Component/PivateRoute/PrivateRoute";
import MainDashbord from "./Dashbord/MainDashbord/MainDashbord";
// contact list
import ContactList from "./Component/Routers/Contact/ContactList";
import CreateContactList from "./Component/Routers/Contact/CreateContactList";
import ShowContactList from "./Component/Routers/Contact/ShowContactList";
import EditContactList from "./Component/Routers/Contact/EditContactList";
// contact categorey list
import ContactCategoryList from "./Component/Routers/ContactCategory/ContactCategoryList";
import EditContactCategory from "./Component/Routers/ContactCategory/EditContactCategory";
import CreateContactCategory from "./Component/Routers/ContactCategory/CreateContactCategory";
// colinet list
import ClientList from "./Component/Routers/ClientList/ClientList";
import CreateClinetList from "./Component/Routers/ClientList/CreateClinetList";
import ShowClinetList from "./Component/Routers/ClientList/ShowClientList";
import EditClinetList from "./Component/Routers/ClientList/EditClientList";

// clinet category
import ClientCategoryList from "./Component/Routers/ClientCategoryList/ClientCategoryList";
import CreateClientCategory from "./Component/Routers/ClientCategoryList/CreateClientCategoryList";
import EditClientCategory from "./Component/Routers/ClientCategoryList/EditClientCategory";

// Blog post Write
import BlogPost from "./Component/Routers/Blog/BlogPost";
import CreateBlogPost from "./Component/Routers/Blog/CreateBlogPost";
import EditBlogPost from "./Component/Routers/Blog/EditBlogPost";

// Faq Route
import FaqServerRouter from "./Component/Routers/Faq/Faq";
import CreateFaqRouter from "./Component/Routers/Faq/CreateFaq";
import EditFaq from "./Component/Routers/Faq/editFaq";
// Team Member
import TeamMember from "./Component/Routers/TeamMember/TeamMember";
import CreateTeamMember from "./Component/Routers/TeamMember/CreateTeamMember";
import EditTeamMember from "./Component/Routers/TeamMember/EditTeamMember";
// clinet message
import Message from "./Component/Routers/ClientMessage/Message";
import ShowMessage from "./Component/Routers/ClientMessage/ShowMessage";
//Appointment
import AllAppointment from "./Component/Routers/Appointment/AllAppointment";
import CreateAppointment from "./Component/Routers/Appointment/CreateAppointment";
import ShowAppointment from "./Component/Routers/Appointment/ShowAppointment";
import EditAppointment from "./Component/Routers/Appointment/EditAppointment";
// patner
import AllMemberFirm from "./Component/Routers/Patner/AllMemberFirm";
import CreateMemberFirm from "./Component/Routers/Patner/CreateMemberFirm";
import ShowTeamMember from "./Component/Routers/TeamMember/ShowTeamMember";
import ShowBlogPost from "./Component/Routers/Blog/ShowBlogPost";
import ShowFaq from "./Component/Routers/Faq/ShowFaq";
import JobPost from "./Component/Routers/jobPost/JobPost";
import CreateJobPostRouter from "./Component/Routers/jobPost/CreateJobPost";
import ShowJobPost from "./Component/Routers/jobPost/ShowJobPost";
import EditJobPost from "./Component/Routers/jobPost/editJobPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<AdminLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<MainDashbord />} />
          {/* ContactList */}
          <Route path="contact" element={<ContactList />} />
          <Route path="contact/create" element={<CreateContactList />} />
          <Route path="contact/:id" element={<ShowContactList />} />
          <Route path="contact/edit/:id" element={<EditContactList />} />
          {/* ContactCategoryList */}
          <Route path="contact/category" element={<ContactCategoryList />} />
          <Route
            path="contact/category/edit/:id"
            element={<EditContactCategory />}
          />
          <Route
            path="contact/category/create"
            element={<CreateContactCategory />}
          />

          {/* client list  */}
          <Route path="client" element={<ClientList />} />
          <Route path="client/create" element={<CreateClinetList />} />
          <Route path="client/:id" element={<ShowClinetList />} />
          <Route path="client/edit/:id" element={<EditClinetList />} />

          {/* clinet category */}
          <Route path="client/category" element={<ClientCategoryList />} />
          <Route
            path="client/category/edit/:id"
            element={<EditClientCategory />}
          />
          <Route
            path="client/category/create"
            element={<CreateClientCategory />}
          />

          {/* Blog Post */}
          <Route path="blogpost" element={<BlogPost />} />
          <Route path="blogpost/create" element={<CreateBlogPost />} />
          <Route path="blogpost/:id" element={<ShowBlogPost />} />
          <Route path="blogpost/edit/:id" element={<EditBlogPost />} />

          {/* Job post Route */}
          <Route path="job" element={<JobPost />} />
          <Route path="job/create" element={<CreateJobPostRouter />} />
          <Route path="job/:id" element={<ShowJobPost />} />
          <Route path="job/edit/:id" element={<EditJobPost />} />

          {/* Faq Route */}
          <Route path="faq" element={<FaqServerRouter />} />
          <Route path="faq/create" element={<CreateFaqRouter />} />
          <Route path="faq/:id" element={<ShowFaq />} />
          <Route path="faq/edit/:id" element={<EditFaq />} />

          {/* Team Member */}
          <Route path="teamMember" element={<TeamMember />} />
          <Route path="teamMember/create" element={<CreateTeamMember />} />
          <Route path="teamMember/:id" element={<ShowTeamMember />} />
          <Route path="teamMember/edit/:id" element={<EditTeamMember />} />

          {/* clinet Message */}
          <Route path="message" element={<Message />} />
          <Route path="message/:id" element={<ShowMessage />} />

          {/* Appointment */}
          <Route path="appointment" element={<AllAppointment />} />
          <Route path="appointment/create" element={<CreateAppointment />} />
          <Route path="appointment/:id" element={<ShowAppointment />} />
          <Route path="appointment/edit/:id" element={<EditAppointment />} />

          {/* patner  */}
          <Route path="member" element={<AllMemberFirm />} />
          <Route path="member/create" element={<CreateMemberFirm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
