import { QueryClient, QueryClientProvider } from "react-query";
import {Outlet, Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import LOGIN from "./components/Log-in/Log-in";
import updateProfile from "./components/UserProfile/UpdateProfile";

import About from "./components/about/About";
import Footer from "./components/common/footer/footer";
import Header from "./components/common/header/header";
import Contact from "./components/contact/Contact";
import Home from "./components/home/Home";
import SIGNUP from "./components/sign-up/Sign-up";
import { StoreProvider } from "./store";

import Dashboard from "./components/admin-dashboard/Dashboard";
import AllStudents from "./components/admin-dashboard/User/AllUsers";
import CreateNewStudent from "./components/admin-dashboard/User/CreateNewUser";
import EditFormStudent from "./components/admin-dashboard/User/EditFormUser";
import Aside_Admin from "./components/common/asidebar-admin/asidebar";

import CreateRoadmap from "./components/admin-dashboard/roadmap/AddRoadmap";
import CreateSteps from "./components/admin-dashboard/roadmap/steps/CreateSteps";

import AllSteps from "./components/admin-dashboard/roadmap/steps/AllSteps";
import MyRoadmaps from "./components/admin-dashboard/roadmap/MyRoadmaps";
import AllRoadmaps from"./components/allroadmaps/RoadmapsHome";
import SelectRoadmap from "./components/SelectRoadmap/SelectRoadmap";
import AllResouces from "./components/admin-dashboard/roadmap/steps/resources/AllResouces";
import RoadmapByUser from "./components/admin-dashboard/aproved/RoadmapByUser";
import StepsByUser from "./components/admin-dashboard/aproved/StepsByUser";
import ResourcesByuser from "./components/admin-dashboard/aproved/ResourcesByuser";
import CreateResources from "./components/admin-dashboard/roadmap/steps/resources/CreateResource";
import EditRoadmap from "./components/admin-dashboard/roadmap/EditRoadmap";
import Aside_user from "./components/common/asidebar-user/asidebar";
import UserCreateRoadmap from "./components/user-dashboard/roadmap/AddRoadmap";
import UserCreateSteps from "./components/user-dashboard/roadmap/steps/CreateSteps";
import UserCreateResources from "./components/user-dashboard/roadmap/steps/resources/CreateResource";
import UserAllSteps from "./components/user-dashboard/roadmap/steps/AllSteps";
import UserAllResouces from "./components/user-dashboard/roadmap/steps/resources/AllResouces";
import UserEditRoadmap from "./components/user-dashboard/roadmap/EditRoadmap";
import UserRoadmaps from "./components/user-dashboard/roadmap/MyRoadmaps";
import UserProfile from "./components/user-dashboard/roadmap/EditFormUser";
import AdminProfile from "./components/admin-dashboard/AdminProfile";
export const REST_API_BASE_URL = "http://localhost:9090/api";

// Create a new queryClient instance

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      {" "}
      <Router>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>

          <Routes>
              <Route
                path="/user"
                element={
                  <>
                    <Aside_user />
                    <Outlet />
                  </>
                }
              >
                <Route path="profile" element={<UserProfile />} />


                 <Route path="createroadmap" element={<UserCreateRoadmap />} />
                <Route path="create-steps/:id" element={<UserCreateSteps />} />
                <Route path="create-resources/:id" element={<UserCreateResources />} />


                <Route path="roadmaps" element={<UserRoadmaps />} />
                <Route path="roadmap/steps/:id" element={<UserAllSteps />}/>
                <Route path="roadmap/steps/resources/:id" element={<UserAllResouces />} />
                

                {/* <Route path="/admin/edit-roadmap/:id" element={<UserEditRoadmap/>} /> */}
                </Route>
              <Route
                path="/admin"
                element={
                  <>
                    <Aside_Admin />
                    <Outlet />
                  </>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />

                <Route path="profile" element={<AdminProfile />} />

                <Route path="students" element={<AllStudents />} />
                <Route path="student-add" element={<CreateNewStudent />} />
                <Route path="student-edit/:id" element={<EditFormStudent />} />


                <Route path="createroadmap" element={<CreateRoadmap />} />
                <Route path="create-steps/:id" element={<CreateSteps />} />
                <Route path="create-resources/:id" element={<CreateResources />} />


                <Route path="roadmaps" element={<MyRoadmaps />} />
                <Route path="roadmap/steps/:id" element={<AllSteps />} />
                <Route path="roadmap/steps/resources/:id" element={<AllResouces />} />
                

                <Route path="/admin/edit-roadmap/:id" element={<EditRoadmap/>} />
                
                <Route path="approved/roadmap" element={< RoadmapByUser />} />
                <Route path="approved/roadmap/steps/:id" element={< StepsByUser />} />
                <Route path="approved/roadmap/steps/resources/:id" element={< ResourcesByuser />} />
              </Route>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Outlet />
                    <Footer />
                  </>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="allroadmaps" element={<AllRoadmaps/>}/>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route exact path="/sign-up" element={<SIGNUP />} />
                <Route exact path="/login" element={<LOGIN />} />
                <Route path="/s/:id" element={<SelectRoadmap />} />
              </Route>
            </Routes>
          </StoreProvider>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
