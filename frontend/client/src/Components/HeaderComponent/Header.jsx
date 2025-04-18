import styles from "./Header.module.scss"
import imgNoticification from "../../assets/imgNoticification.png"
import imgMsg from "../../assets/imgMsg.png"
import imgAva from "../../assets/imgAva.png"
import { useNavigate } from "react-router"
export function Header(){
    const navigate = useNavigate()
    const name = "Alex Smith"
    return (
        <div className={styles.Header}> 
            <div className={styles.menu}>
                <h2 className={styles.textTroodCommunity} onClick={()=>{
                    navigate("/")
                }}>TROOD COMMUNITY</h2>
                <div className={styles.infoMenu}>
                    <div className={styles.actionBlock}>
                        <img src={imgMsg} alt="imgMsg" />
                        <img src={imgNoticification} alt="imgNoticification" />
                    </div>
                    <div className={styles.avaBlock}>
                        <img src={imgAva} alt="imgAva" />
                        <p className={styles.nickName}>{name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}