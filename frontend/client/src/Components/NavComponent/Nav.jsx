import styles from "./Nav.module.scss";
import { useNavigate } from "react-router";
export function Nav() {
    const navigate = useNavigate()
  return (
    <div className={styles.Nav}>
      <div className={styles.navMenuBox}>
        <button className={styles.navBtn} onClick={()=>{
            navigate("/")
        }}><p className={styles.textNavBtn}>Main page</p></button>
        <button className={styles.navBtn} onClick={()=>{
            navigate("/projects")
        }}><p className={styles.textNavBtn}>Projects</p></button>
        <button className={styles.navBtn} onClick={()=>{
            navigate("/vacancies")
        }}><p className={styles.textNavBtn}>Vacancie</p></button>
        <button className={styles.navBtn} onClick={()=>{
            navigate("*")
        }}><p className={styles.textNavBtn}>People</p></button>
        <button className={styles.navBtn} onClick={()=>{
            navigate("*")
        }}><p className={styles.textNavBtn}>Tests</p></button>
        <button className={styles.navBtn} onClick={()=>{
            navigate("*")
        }}><p className={styles.textNavBtn}>Activities</p></button>
        <button className={styles.navBtn} onClick={()=>{
            navigate("*")
        }}><p className={styles.textNavBtn}>Settings</p></button>
      </div>
      <p className={styles.textLogout}>Log out</p>
    </div>
  );
}
