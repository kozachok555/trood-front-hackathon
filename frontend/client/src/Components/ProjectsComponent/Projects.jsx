import styles from "./Projects.module.scss";
import { useAtom } from "jotai";
import { refreshTriggerAttom, projectsAtom } from "../../atoms";
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
  const [, refresh] = useAtom(refreshTriggerAttom);
  const navigate = useNavigate();

  if (projects.state === "loading") return <p>Loading...</p>;
  if (projects.state === "hasError") return <p>Error loading projects</p>;

  return (
    <div className={styles.Projects}>
      <div className={styles.divCreateProject}>
        <p className={styles.textProjects}>Active projects</p>
        <button className={styles.btnCreateProject}>Create project</button>
      </div>
      <div className={styles.activeProjects}>
        {projects.data.map((project, index) => {
          if (!isDeadlinePassed(project.deadline)) {
            return (
              <div key={index} className={styles.activeProjectCard}>
                <div className={styles.cardBox}>
                  <p className={styles.textDesc}>{project.description}</p>
                  <div className={styles.avaBox}>
                    <AvaNick />
                    <ActionBlock />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <p className={styles.textProjects}>Passed projects</p>
      <div className={styles.passedProjects}>
        {projects.data.map((project, index) => {
          if (isDeadlinePassed(project.deadline)) {
            return (
              <div key={index} className={styles.passedProjectCard}>
                <div className={styles.cardBox}>
                  <p className={styles.textDesc}>{project.description}</p>
                  <div className={styles.avaBox}>
                    <AvaNick />
                    <ActionBlock />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
