import imgNoticification from "../../assets/imgNoticification.png"
import imgMsg from "../../assets/imgMsg.png"
import styles from "./ActionBlock.module.scss"
export function ActionBlock() {
  return (
    <div className={styles.ActionBlock}>
      <img src={imgMsg} alt="imgMsg" />
      <img src={imgNoticification} alt="imgNoticification" />
    </div>
  );
}
