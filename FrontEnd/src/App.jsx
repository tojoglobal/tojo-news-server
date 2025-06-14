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
import Authors from "./Component/Routers/Authors/Authors";
import EditAuthors from "./Component/Routers/Authors/EditAuthors";
import CreateAuthors from "./Component/Routers/Authors/CreateAuthors";

// clinet list
import ClientList from "./Component/Routers/ClientList/ClientList";
import CreateClinetList from "./Component/Routers/ClientList/CreateClinetList";
import ShowClinetList from "./Component/Routers/ClientList/ShowClientList";
import EditClinetList from "./Component/Routers/ClientList/EditClientList";

// News category
import NewsCategory from "./Component/Routers/NewsCategory/NewsCategory";
import EditNewsCategory from "./Component/Routers/NewsCategory/EditNewsCategory";
import CreateNewsCategory from "./Component/Routers/NewsCategory/CreateNewsCategory";

// Blog post Write
import BlogPost from "./Component/Routers/Blog/BlogPost";
import CreateBlogPost from "./Component/Routers/Blog/CreateBlogPost";
import EditBlogPost from "./Component/Routers/Blog/EditBlogPost";

// TagName Route
import TagNameServerRouter from "./Component/Routers/TagName/TagName";
import CreateTagNameRouter from "./Component/Routers/TagName/CreateTagName";
import EditTagName from "./Component/Routers/TagName/editTagName";

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

// job post
import JobPost from "./Component/Routers/jobPost/JobPost";
import CreateJobPostRouter from "./Component/Routers/jobPost/CreateJobPost";
import ShowJobPost from "./Component/Routers/jobPost/ShowJobPost";
import EditJobPost from "./Component/Routers/jobPost/editJobPost";

// podcasts router
import Podcasts from "./Component/Routers/Podcasts/Podcasts";
import CreatePodcasts from "./Component/Routers/Podcasts/CreatePodcasts";
import ShowPodcasts from "./Component/Routers/Podcasts/ShowPodcasts";
import EditPodcasts from "./Component/Routers/Podcasts/EditPodcasts";

// app provider
import { AppProvider } from "./Dashbord/SmallComponent/AppContext";

// Episodes Router
import Episodes from "./Component/Routers/Episodes/Episodes";
import CreateEpisodes from "./Component/Routers/Episodes/CreateEpisodes";
import ShowEpisodes from "./Component/Routers/Episodes/ShowEpisodes";
import EditEpisodes from "./Component/Routers/Episodes/EditEpisodes";
import SponsoredPost from "./Component/Routers/Sponsored/SponsoredPost";
import CreateSponsoredPost from "./Component/Routers/Sponsored/CreateSponsoredPost";
import ShowSponsoredPost from "./Component/Routers/Sponsored/ShowSponsoredPost";
import EditSponsoredPost from "./Component/Routers/Sponsored/EditSponsoredPost";
import EventsPost from "./Component/Routers/Events/EventsPost";
import CreateEventsPost from "./Component/Routers/Events/CreateEventsPost";
import ShowEventsPost from "./Component/Routers/Events/ShowEventsPost";
import EditEventsPost from "./Component/Routers/Events/EditEventsPost";
import DocumentariesPost from "./Component/Routers/Documentories/DocumentariesPost";

function App() {
  return (
    <AppProvider>
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

            {/* Authors */}
            <Route path="author" element={<Authors />} />
            <Route path="author/edit/:id" element={<EditAuthors />} />
            <Route path="author/create" element={<CreateAuthors />} />

            {/* client list  */}
            <Route path="client" element={<ClientList />} />
            <Route path="client/create" element={<CreateClinetList />} />
            <Route path="client/:id" element={<ShowClinetList />} />
            <Route path="client/edit/:id" element={<EditClinetList />} />

            {/* clinet category */}
            <Route path="newscategory" element={<NewsCategory />} />
            <Route
              path="newscategory/edit/:id"
              element={<EditNewsCategory />}
            />
            <Route
              path="newscategory/create"
              element={<CreateNewsCategory />}
            />

            {/* Blog Post */}
            <Route path="blogpost" element={<BlogPost />} />
            <Route path="blogpost/create" element={<CreateBlogPost />} />
            <Route path="blogpost/:id" element={<ShowBlogPost />} />
            <Route path="blogpost/edit/:id" element={<EditBlogPost />} />

            {/* Documentaries Post */}
            <Route path="documentaries" element={<DocumentariesPost />} />
            {/* <Route path="Sponsored/create" element={<CreateSponsoredPost />} />
            <Route path="Sponsored/:id" element={<ShowSponsoredPost />} />
            <Route path="Sponsored/edit/:id" element={<EditSponsoredPost />} /> */}

            {/* Sponsored Post */}
            <Route path="Sponsored" element={<SponsoredPost />} />
            <Route path="Sponsored/create" element={<CreateSponsoredPost />} />
            <Route path="Sponsored/:id" element={<ShowSponsoredPost />} />
            <Route path="Sponsored/edit/:id" element={<EditSponsoredPost />} />

            {/* Events Post */}
            <Route path="events" element={<EventsPost />} />
            <Route path="events/create" element={<CreateEventsPost />} />
            <Route path="events/:id" element={<ShowEventsPost />} />
            <Route path="events/edit/:id" element={<EditEventsPost />} />

            {/* Episodes Post */}
            <Route path="Episodes" element={<Episodes />} />
            <Route path="Episodes/create" element={<CreateEpisodes />} />
            <Route path="Episodes/:id" element={<ShowEpisodes />} />
            <Route path="Episodes/edit/:id" element={<EditEpisodes />} />

            {/* Job post Route */}
            <Route path="job" element={<JobPost />} />
            <Route path="job/create" element={<CreateJobPostRouter />} />
            <Route path="job/:id" element={<ShowJobPost />} />
            <Route path="job/edit/:id" element={<EditJobPost />} />

            {/* TagName Route */}
            <Route path="TagName" element={<TagNameServerRouter />} />
            <Route path="TagName/create" element={<CreateTagNameRouter />} />

            <Route path="TagName/edit/:id" element={<EditTagName />} />

            {/* Team Member */}
            <Route path="teamMember" element={<TeamMember />} />
            <Route path="teamMember/create" element={<CreateTeamMember />} />
            <Route path="teamMember/:id" element={<ShowTeamMember />} />
            <Route path="teamMember/edit/:id" element={<EditTeamMember />} />

            {/* Podcasts */}
            <Route path="podcasts" element={<Podcasts />} />
            <Route path="podcasts/create" element={<CreatePodcasts />} />
            <Route path="podcasts/:id" element={<ShowPodcasts />} />
            <Route path="podcasts/edit/:id" element={<EditPodcasts />} />

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
    </AppProvider>
  );
}

export default App;
