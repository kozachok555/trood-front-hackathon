import styles from "./Nav.module.scss";
import { useNavigate } from "react-router";
import { useState } from "react";
export function Nav() {
  const navigate = useNavigate();
  const [active, setActive] = useState("/")
  return (
    <div className={styles.Nav}>
      <div className={styles.navMenuBox}>
        <button
          className={`${styles.navBtn} ${active === "/" ? styles.active : ""}`}
          onClick={() => {
            setActive("/");
            navigate("*");
          }}
        >
          <p className={styles.textNavBtn}>Main page</p>
        </button>
        <button
          className={`${styles.navBtn} ${active === "/projects" ? styles.active : ""}`}
          onClick={() => {
            setActive("/projects");
            navigate("/projects");
          }}
        >
          <p className={styles.textNavBtn}>Projects</p>
        </button>
        <button
          className={`${styles.navBtn} ${active === "/vacancies" ? styles.active : ""}`}
          onClick={() => {
            setActive("/vacancies");
            navigate("*");
          }}
        >
          <p className={styles.textNavBtn}>Vacancies</p>
        </button>
        <button
          className={`${styles.navBtn} ${active === "/people" ? styles.active : ""}`}
          onClick={() => {
            setActive("/people");
            navigate("*");
          }}
        >
          <p className={styles.textNavBtn}>People</p>
        </button>
        <button
         className={`${styles.navBtn} ${active === "/tests" ? styles.active : ""}`}
          onClick={() => {
            setActive("/tests");
            navigate("*");
          }}
        >
          <p className={styles.textNavBtn}>Tests</p>
        </button>
        <button
          className={`${styles.navBtn} ${active === "/activities" ? styles.active : ""}`}
          onClick={() => {
            setActive("/activities");
            navigate("*");
          }}
        >
          <p className={styles.textNavBtn}>Activities</p>
        </button>
        <button
         className={`${styles.navBtn} ${active === "/settings" ? styles.active : ""}`}
          onClick={() => {
            setActive("/settings");
            navigate("*");
          }}
        >
          <p className={styles.textNavBtn}>Settings</p>
        </button>
      </div>
      <p className={styles.textLogout}>Log out</p>
    </div>
  );
}
