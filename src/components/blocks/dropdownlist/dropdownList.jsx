import { useState } from "react";
import {StyledList, SubList} from "./styles.js";

function DropdownList({ title, items, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <StyledList onClick={toggleDropdown} $isOpen={isOpen}>
            {title}
            <SubList $isOpen={isOpen}>
                {items.map((item, index) => (
                    <li key={index} onClick={() => onSelect(item.name, item.task_type_id)} style={{marginTop: "10px"}}>
                        {item.name}
                    </li>
                ))}
            </SubList>
        </StyledList>
    );
}

export default DropdownList;