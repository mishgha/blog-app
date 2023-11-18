import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/UserDashboard';
import ProfileInfo from './pages/ProfileInfo';
import PostPage from './pages/PostPage';
import UpdateEmail from './pages/UpdateEmail';
import UpdatePassword from './pages/UpdatePassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSuggestion from './pages/AddSuggestion';
import AdminDashboard from './pages/AdminDashboard';
import ModeratorDashboard from './pages/ModeratorDashboard';
import PostForApproval from './pages/PostForApproval';
import PostForRemoval from './pages/PostForRemoval';
import MyPosts from './pages/MyPosts';
import ViewSuggestion from './pages/ViewSuggestion';
import ManageUser from './pages/ManageUser';
import ManagePost from './pages/ManagePost';


function App() {
    return (
    
      <BrowserRouter>
      <ToastContainer />
          <Routes>
            <Route path="/home"  element={<Home />} />
            <Route path="/login"  element={<Login />}/>
            <Route path="/signup"  element={<Signup />}/>
            <Route path='/posts/:postId'  element={<PostPage />}/>
            
            {/* User Role */}
            <Route path='/user'  element={<PrivateRoute />}>
              <Route path='dashboard'  element={<UserDashboard />}/>
              <Route path='profile-info'  element={<ProfileInfo />}/>
              <Route path='updateEmail'  element={<UpdateEmail />}/>
              <Route path='updatePassword'  element={<UpdatePassword />}/>
              <Route path='addSuggestion/:userId/:postId' element={<AddSuggestion/>}/>
              <Route path='my-posts' element={<MyPosts/>}/>
              <Route path='viewSuggestion/:postId' element={<ViewSuggestion />}/>
            </Route>

            {/* Admin Role */}
            <Route path='/admin' element={<PrivateRoute />}>
              <Route path='dashboard' element={<AdminDashboard />}/>
              <Route path='manage-users' element={<ManageUser />}/>
              <Route path='manage-posts' element={<ManagePost />}/>
            </Route>

            {/* Moderator Role */}
            <Route path='/moderator' element={<PrivateRoute />}>
              <Route path='dashboard' element={<ModeratorDashboard />}/>
              <Route path='post-for-approval' element={<PostForApproval />}/>
              <Route path='post-for-removal' element={<PostForRemoval/>} />
            </Route>
        </Routes>
      </BrowserRouter>

    );
  }


export default App;
