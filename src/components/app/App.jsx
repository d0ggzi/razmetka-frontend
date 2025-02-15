import { useState } from 'react'
import ProtectedRoute from "../protected-route/protected-route.jsx";
import ProfilePage from "../pages/profile-page/profile-page.jsx";
import {Route, Routes} from "react-router-dom";
import LoginPage from "../pages/login-page/login-page.jsx";
import MainPage from "../pages/main-page/main-page.jsx";
import PageWrapper from "../layout/page-wrapper/page-wrapper.jsx";
import {GlobalStyle} from "./styles.js";
import Modal from "../layout/modal/modal.jsx";

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  return (
    <>
      <GlobalStyle/>
      <Routes>
        <Route path='/' element={<PageWrapper setSelectedProject={setSelectedProject}></PageWrapper>}>
          <Route index element={
            <ProtectedRoute>
              <MainPage setModalActive={setModalActive} setModalContent={setModalContent} selectedProject={selectedProject}/>
            </ProtectedRoute>
          }/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='profile' element={
            <ProtectedRoute>
              <ProfilePage/>
            </ProtectedRoute>
          }/>
          {/*<Route path='*' element={<NotFoundPage/>}/>*/}
        </Route>
      </Routes>
      <Modal modalActive={modalActive} setModalActive={setModalActive}>{modalContent}</Modal>
    </>
  )
}

export default App
