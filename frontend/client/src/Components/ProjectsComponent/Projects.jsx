import styles from "./Projects.module.scss";
import { useAtom } from "jotai";
import { projectsAtom } from "../../atoms";
import { useNavigate } from "react-router";
import { AvaNick } from "../AvaNickComponent/AvaNick";
import { ActionBlock } from "../ActionBlockComponent/ActionBlock";
function isDeadlinePassed(deadlineStr) {
  //Checking deadline
  const [day, month, year] = deadlineStr.split("."); //split our month day year to variables
  const deadlineDate = new Date(`${year}-${month}-${day}`); // str deadline convert to date
  const now = new Date(); // today

  return deadlineDate < now; //returns true or false,depends deadline is Active(false) or deadline is Passed(true)
}
export function Projects() {
  const [projects] = useAtom(projectsAtom);
  const navigate = useNavigate();

  if (projects.state === "loading") return <p>Loading...</p>;
  if (projects.state === "hasError") return <p>Error loading projects</p>;

  return (
    <div className={styles.Projects}>
      <div className={styles.projectsWrapper}>
        <div className={styles.divCreateProject}>
          <p className={styles.textActiveProjects}>Active projects</p>
          <button
            className={styles.btnCreateProject}
            onClick={() => {
              navigate("/projects/create-project");
            }}
          >
            <p className={styles.btnText}>Create project</p>
          </button>
        </div>
        <div className={styles.activeProjects}>
          {projects.data.map((project, index) => {
            if (!isDeadlinePassed(project.deadline)) {
              return (
                <div key={index} className={styles.activeProjectCard} onClick={()=>{
                  navigate(`/projects/${project.id}`)
                }}>
                  <div className={styles.cardBox}>
                    <div className={styles.cardInfoBox}>
                      <p className={styles.textName}>{project.name}</p>
                      <p className={styles.textDesc}>{project.description}</p>
                    </div>
                    <div className={styles.avaBox}>
                      <AvaNick />
                      <p className={styles.textDeadline}>
                        {project.deadline}
                      </p>
                      <ActionBlock />
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <p className={styles.textPassedProjects}>Passed projects</p>
        <div className={styles.passedProjects}>
          {projects.data.map((project, index) => {
            if (isDeadlinePassed(project.deadline)) {
              return (
                <div key={index} className={styles.passedProjectCard} onClick={()=>{
                  navigate(`/projects/${project.id}`)
                }}>
                  <div className={styles.cardBox}>
                    <p className={styles.textName}>{project.name}</p>
                    <div className={styles.avaBox}>
                      <AvaNick />
                      <p className={styles.textDeadline}>
                        {project.deadline}
                      </p>
                      <ActionBlock />
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
