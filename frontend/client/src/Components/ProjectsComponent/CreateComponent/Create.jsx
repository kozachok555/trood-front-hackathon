import styles from "./Create.module.scss";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { refreshTriggerAttom } from "../../../atoms";

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
function formatDateToDDMMYYYY(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
}
export function Create() {
  const navigate = useNavigate();
  const [, refresh] = useAtom(refreshTriggerAttom);

  const onSubmit = async (values) => {
    try {
      values.deadline = formatDateToDDMMYYYY(values.deadline);
      const response = await fetch("/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error request");
      }
      const result = await response.json();
      console.log("Project created:", result);
      refresh((prev) => prev + 1);
      navigate("/projects");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className={styles.Create}>
      <div className={styles.formBlock}>
        <p className={styles.textCreatingProject}>Creating project</p>
        <div className={styles.formWrapper}>
          <div className={styles.formCard}>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.nameFieldBox}>
                    <div className={styles.nameField}>
                      <label className={styles.textField}>Name</label>
                      <Field name="name">
                        {({ input, meta }) => (
                          <div>
                            <input
                              {...input}
                              type="text"
                              className={styles.inputName}
                            />
                            {/* {meta.touched && meta.error && (
                              <span>{meta.error}</span>
                            )} for validation*/}
                          </div>
                        )}
                      </Field>
                    </div>

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
                  </div>

                  <div className={styles.expDeadlineBox}>
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
