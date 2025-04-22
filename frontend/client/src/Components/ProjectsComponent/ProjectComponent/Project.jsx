import styles from "./Project.module.scss";
import { Form, Field } from "react-final-form";
import { projectsAtom, refreshTriggerAttom } from "../../../atoms";
import { useNavigate, useParams, Navigate } from "react-router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
const validate = (values) => {
  const errors = {};

  //   if (!values.name) {
  //     errors.name = "Name is required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "At least 3 letters";
  //   }

  //   if (!values.field) {
  //     errors.field = "Field is required";
  //   }

  //   if (!values.experience) {
  //     errors.experience = "Experience is required";
  //   }

  //   if (!values.deadline) {
  //     errors.deadline = "Deadline is required";
  //   } else {
  //     const deadlineDate = new Date(values.deadline);
  //     const today = new Date();
  //     today.setDate(today.getDate());
  //     today.setHours(0, 0, 0, 0);

  //     if (deadlineDate < today) {
  //       errors.deadline = "Deadline should be later than today";
  //     }
  //   }

  //   if (!values.description) {
  //     errors.description = "Description is required";
  //   } else if (values.description.length < 10) {
  //     errors.description = "At least 10 letters";
  //   }

  return errors;
};
export function Project() {
  const navigate = useNavigate();
  const [, refresh] = useAtom(refreshTriggerAttom);
  const { id } = useParams();
  const [projects] = useAtom(projectsAtom);
  const [project, setProject] = useState()
  useEffect(() => {
    const found = projects?.data?.find(
      (elem) => String(elem.id) === String(id)
    );
    setProject(found || null)
  }, [id]);

  const onSubmit = async (values) => {
    console.log(project);
  };

  if (project === null) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className={styles.Project}>
      <div className={styles.formBlock}>
        <div className={styles.formBlockHeader}>
          <p className={styles.textCreatingProject}>
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
            <p>Delete project</p>
          </button>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.formCard}>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.infoBox}>
                    <div className={styles.field}>
                      <label className={styles.textField}>Field</label>
                      <Field name="field" component="select">
                        {({ input, meta }) => (
                          <div>
                            <select {...input} className={styles.inputSelect}>
                              <option value=""></option>
                              <option value="Design">Design</option>
                              <option value="Development">Development</option>
                              <option value="Marketing">Marketing</option>
                            </select>
                            {/* {meta.touched && meta.error && (
                                              <span>{meta.error}</span>
                                            )} for validation */}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className={styles.expField}>
                      <label className={styles.textField}>Experience</label>
                      <Field name="experience">
                        {({ input, meta }) => (
                          <div>
                            <input
                              {...input}
                              type="text"
                              className={styles.inputExperience}
                            />
                            {/* {meta.touched && meta.error && (
                                              <span>{meta.error}</span>
                                            )} for validation */}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className={styles.deadlineField}>
                      <label className={styles.textField}>Deadline</label>
                      <Field name="deadline">
                        {({ input, meta }) => (
                          <div>
                            <input
                              {...input}
                              type="date"
                              className={styles.inputDeadline}
                            />
                            {/* {meta.touched && meta.error && (
                                              <span>{meta.error}</span>
                                            )} for validation */}
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className={styles.descField}>
                    <label className={styles.textField}>Description</label>
                    <Field name="description">
                      {({ input, meta }) => (
                        <div>
                          <textarea
                            {...input}
                            className={styles.inputTextarea}
                          />
                          {/* {meta.touched && meta.error && (
                                            <span>{meta.error}</span>
                                          )} for validation */}
                        </div>
                      )}
                    </Field>
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    <p className={styles.btnText}>Create project</p>
                  </button>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
