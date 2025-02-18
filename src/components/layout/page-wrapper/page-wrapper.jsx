import Header from "../header/header";
import { StyledPageWrapper } from "./styles";
import { Outlet } from "react-router-dom";

function PageWrapper ({ setSelectedProjectName, setSelectedProjectId }){
  return (
    <>
      <Header setSelectedProjectName={setSelectedProjectName} setSelectedProjectId={setSelectedProjectId}/>
      <StyledPageWrapper>
        <Outlet/>
      </StyledPageWrapper>
    </>
  );
}

export default PageWrapper;