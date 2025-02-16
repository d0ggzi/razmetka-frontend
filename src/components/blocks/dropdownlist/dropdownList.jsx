import { useState } from "react";
import {StyledList, SubList} from "./styles.js";
import {useNavigate} from "react-router-dom";

function DropdownList({ title, items, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <StyledList onClick={toggleDropdown} $isOpen={isOpen}>
            {title}
            <SubList $isOpen={isOpen}>
                {items.map((item, index) => (
                    <li key={index} onClick={() => { onSelect(item.label); navigate("/") }} style={{marginTop: "10px"}}>
                        {item.label}
                    </li>
                ))}
            </SubList>
        </StyledList>
    );
}

export default DropdownList;