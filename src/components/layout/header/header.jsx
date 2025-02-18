import { useContext } from "react";

import { StyledHeader} from "./styles"
import { UserContext } from "../../../context/user-context";
import Avatar from "../../blocks/avatar/avatar.jsx";
import Nav from "../nav/nav.jsx";

function Header({setSelectedProjectName, setSelectedProjectId}) {
  const [token] = useContext(UserContext);
  return (
    <StyledHeader>
      {token && <Nav setSelectedProjectName={setSelectedProjectName} setSelectedProjectId={setSelectedProjectId}></Nav>}
        {token && <Avatar/>}
    </StyledHeader>
  )
}

export default Header;