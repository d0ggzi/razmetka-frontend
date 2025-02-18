import ProjectSearch from "./projects/search/projectSearch.jsx";
import ProjectMatching from "./projects/matching/projectMatching.jsx";

function Markup({selectedProjectName, selectedProjectId}) {
    return (
        <div>
            {(() => {
                if (selectedProjectName.toLowerCase() === "search") {
                    return (
                        <ProjectSearch
                            projectId={selectedProjectId}
                        />
                    )
                } else if (selectedProjectName.toLowerCase() === "matching") {
                    return (
                        <ProjectMatching
                            projectId={selectedProjectId}
                        />
                    )
                } else {
                    return (
                        <p>Выберите проект для разметки</p>
                    )
                }
            })()}
        </div>
    );
}

export default Markup;
