import styles from "./Create.module.scss";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router";
const REACT_APP_API_URL= "https://backend-trood-test-1.onrender.com"
function formatDateToDDMMYYYY(dateStr) {
  // formating the data deadline
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
}
export function Create() {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      values.deadline = formatDateToDDMMYYYY(values.deadline);
      const response = await fetch(`${REACT_APP_API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const saved = await response.json();
        const local = localStorage.getItem("projects_data");
        const current = local ? JSON.parse(local) : [];
        current.push(saved);
        localStorage.setItem("projects_data", JSON.stringify(current));

        navigate("/projects");
      }
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
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.nameFieldBox}>
                    <div className={styles.nameField}>
                      <label className={styles.textField}>Name</label>
                      <Field name="name">
                        {({ input }) => (
                          <div>
                            <input
                              {...input}
                              type="text"
                              className={styles.inputName}
                            />
                          </div>
                        )}
                      </Field>
                    </div>

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
                  </div>

                  <div className={styles.expDeadlineBox}>
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
