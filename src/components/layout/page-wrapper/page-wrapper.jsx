import Header from "../header/header";
import { StyledPageWrapper } from "./styles";
import { Outlet } from "react-router-dom";

function PageWrapper ({ setSelectedProject }){
  return (
    <>
      <Header setSelectedProject={setSelectedProject}/>
      <StyledPageWrapper>
        <Outlet/>
      </StyledPageWrapper>
    </>
  );
}

export default PageWrapper;