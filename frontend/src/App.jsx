import Register from "./Register";
import Login from "./Login";
// import Google from './Google.jsx'
import Profile from './Profile.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import AdminUsers from './AdminUsers.jsx'
import { Routes, Route } from "react-router-dom";
import {GoogleOAuthProvider} from '@react-oauth/google'
import PrivacyPolicy from './PrivacyPolicy.jsx';
import TermsOfService from './TermsOfService.jsx';
import Footer from './Footer.jsx';

function App() {
  return (
    <GoogleOAuthProvider clientId="470373993744-tjq6l6bk7ikvbvl46vpbd12pcqepuctb.apps.googleusercontent.com">
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/privacy" element={<PrivacyPolicy />} /> 
          <Route path="/terms" element={<TermsOfService />} /> 
        </Routes>
        
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}
export default App;