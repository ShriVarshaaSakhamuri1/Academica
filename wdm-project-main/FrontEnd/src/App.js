import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Contact from './Contact';
import About from './About';
import Groups from './Groups';
import Forums from './Forums';
import Networking from './Networking';
import JobsInternships from './JobsInternships';
import EventsPage from './EventsPage';
import Profile from './Profile';
import Admin from './Admin';
import AdminHeader from './AdminHeader';
import CreateEventsPage from './CreateEventsPage';
import PostJob from './PostJob';
import Settings from './Settings';
import Logout from './Logout';
import Student from './Student';
import AccountSettings from './AccountSettings';
import StudentHeader from './StudentHeader'; // Import the StudentHeader component
import JobApplications from './JobApplications';
import NotificationPreferences from './NotificationPreferences';
import CareerDevelopmentPage from './CareerDevelopmentPage';
import MentorshipApplication from './MentorshipApplication';
import MentorshipProgram from './MentorshipProgram';
import Callpapers from "./Callpapers";
import Forumpage from './Forumpage';
import Articlepageat from "./Articlepageat";

function App() {
  const role = localStorage.getItem('role'); // Get the role from localStorage

  // Conditionally render headers based on the role
  const renderHeader = () => {
    if (role === 'academic') {
      return <AdminHeader />;
    } else if (role === 'student') {
      return <StudentHeader />;
    } else {
      return <Header />;
    }
  };

  return (
    <Router>
      {renderHeader()} {/* Render the appropriate header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Callpapers" element={<Callpapers />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/forumpage" element={<Forumpage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/networking" element={<Networking />} />
        <Route path="/opportunities" element={<JobsInternships />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/createevent" element={<CreateEventsPage />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/student" element={<Student />} />
        <Route path="/settings" element={<AccountSettings />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/addjob" element={<Logout />} />
        <Route path="/jobs" element={<JobApplications />} />
        <Route path="/notification-preferences" element={<NotificationPreferences />} />
        <Route path="/careerdevelopment" element={<CareerDevelopmentPage />} />
        <Route path="/mentorship" element={<MentorshipProgram />} />
        <Route path="/mentorship" element={<MentorshipProgram />} />
        <Route path="/mentorshipapplication" element={<MentorshipApplication />} />
        <Route path="/mentorship" element={<MentorshipProgram />} />
        <Route path="/article/:id" element={<Articlepageat />} />
      </Routes>
    </Router>
  );
}

export default App;
