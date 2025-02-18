import { StyledAvatar } from "./styles"
function Avatar () {
    return (
        <StyledAvatar to='/profile'>
            <img alt="avatar" src="/assets/avatar-template.svg"/>
        </StyledAvatar>
    )
}

export default Avatar;