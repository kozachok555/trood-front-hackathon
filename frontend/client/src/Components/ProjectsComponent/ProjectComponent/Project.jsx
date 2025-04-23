import styles from "./Project.module.scss";
import { Form, Field } from "react-final-form";
import { projectsAtom, refreshTriggerAttom } from "../../../atoms";
import { useNavigate, useParams, Navigate } from "react-router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export function Project() {
  const navigate = useNavigate();
  const [, refresh] = useAtom(refreshTriggerAttom);
  const { id } = useParams();
  const [projects] = useAtom(projectsAtom);
  const [project, setProject] = useState();

  function formatDateToYYYYMMDD(dateStr) {
    const [day, month, year] = dateStr.split("."); // split to variables
    return `${year}-${month}-${day}`; //convert time to year-month-day
  }
  function formatDateToDDMMYYYY(dateStr) {
    const [year, month, day] = dateStr.split("-"); // split to variables
    return `${day}.${month}.${year}`; //convert time to day.month.year
  }

  useEffect(() => {
    if (!projects || !Array.isArray(projects.data)) {
      return;
    }

    const found = projects.data.find((elem) => String(elem.id) === String(id));
    if (!found) {
      navigate("*");
      return; 
    }
    const updated = {
      ...found,
      deadline: formatDateToYYYYMMDD(found.deadline),
    };
    setProject(updated || null);
  }, [id, projects]);

  const onSubmit = async (values) => {
    const newValues = {
      ...values,
      deadline: formatDateToDDMMYYYY(values.deadline),
    };
    const response = await fetch(`/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValues),
    });
    refresh((prev) => prev - 1);
    navigate("/projects");
  };

  if (project === null) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className={styles.Project}>
      <div className={styles.formBlock}>
        <div className={styles.formBlockHeader}>
          <p className={styles.textProject}>
            Creating visual materials for social media
          </p>
          <button
            className={styles.btnDelete}
            onClick={async () => {
              const response = await fetch(`/projects/${id}`, {
                method: "DELETE",
              });
              refresh((prev) => prev + 1);
              console.log(response);
              navigate("/projects");
            }}
          >
            <p className={styles.btnText}>Delete project</p>
          </button>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.formCard}>
            <Form
              onSubmit={onSubmit}
              initialValues={project}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.infoBox}>
                    <div className={styles.field}>
                      <label className={styles.textField}>Field</label>
                      <Field name="field" component="select">
                        {({ input }) => (
                          <div>
                            <select {...input} className={styles.inputSelect}>
                              <option value=""></option>
                              <option value="Design">Design</option>
                              <option value="Development">Development</option>
                              <option value="Marketing">Marketing</option>
                            </select>
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className={styles.expField}>
                      <label className={styles.textField}>Experience</label>
                      <Field name="experience">
                        {({ input }) => (
                          <div>
                            <input
                              {...input}
                              type="text"
                              className={styles.inputExperience}
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className={styles.deadlineField}>
                      <label className={styles.textField}>Deadline</label>
                      <Field name="deadline">
                        {({ input }) => (
                          <div>
                            <input
                              {...input}
                              type="date"
                              className={styles.inputDeadline}
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className={styles.descField}>
                    <label className={styles.textField}>Description</label>
                    <Field name="description">
                      {({ input }) => (
                        <div>
                          <textarea
                            {...input}
                            className={styles.inputTextarea}
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className={styles.btnBox}>
                    <button type="button" className={styles.addVacancyButton}>
                      <p className={styles.btnText}>Add vacancy</p>
                    </button>
                    <button className={styles.saveButton} type="submit">
                      <p className={styles.btnText}>Save</p>
                    </button>
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
