import styles from "./AvaNick.module.scss"
import imgAva from "../../assets/mdiAcc.png"
export function AvaNick(){
    return(
        <div className={styles.avaNick}>
            <img src={imgAva} alt="imgAva" />
            <p className={styles.textAvaNick}>Anna Lenram</p>
        </div>
    )
}