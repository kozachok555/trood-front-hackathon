import styles from "./Project.module.scss";
import { Form, Field } from "react-final-form";
import { useNavigate, useParams, Navigate } from "react-router";
import { useEffect, useState } from "react";
const REACT_APP_API_URL= "https://backend-trood-test-1.onrender.com"
function formatDateToYYYYMMDD(dateStr) {
  const [day, month, year] = dateStr.split("."); // split to variables
  return `${year}-${month}-${day}`; //convert time to year-month-day
}
function formatDateToDDMMYYYY(dateStr) {
  const [year, month, day] = dateStr.split("-"); // split to variables
  return `${day}.${month}.${year}`; //convert time to day.month.year
}

export function Project() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const store = localStorage.getItem("projects_data");
    if (!store) {
      setIsLoading(false);
      return;
    }
    const data = JSON.parse(store);
    const found = data.find((elem) => String(elem.id) === String(id));

    if (!found) {
      setIsLoading(false);
    } else {
      setProject({
        ...found,
        deadline: formatDateToYYYYMMDD(found.deadline),
      });
      setIsLoading(false);
    }
  }, [id]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!project) {
    return <Navigate to="*" replace />;
  }
  const onSubmit = async (values) => {
    values.deadline = formatDateToDDMMYYYY(values.deadline);

    const response = await fetch(`${REACT_APP_API_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const data = await response.json();
      const store = localStorage.getItem("projects_data");
      let projects = store ? JSON.parse(store) : [];
      projects = projects.map((proj) => {
        if (proj.id === data.id) {
          return data;
        } else {
          return proj;
        }
      });
      localStorage.setItem("projects_data", JSON.stringify(projects));
      navigate("/projects");
    }
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
              await fetch(`${REACT_APP_API_URL}/projects/${id}`, {
                method: "DELETE",
              });
              const response = await fetch(`${REACT_APP_API_URL}/projects`);
              const data = await response.json();
              localStorage.setItem("projects_data", JSON.stringify(data));

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
                    <button type="button" className={styles.button}>
                      <p className={styles.btnText}>Add vacancy</p>
                    </button>
                    <button className={styles.button} type="submit">
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
