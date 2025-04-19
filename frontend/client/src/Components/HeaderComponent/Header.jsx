import styles from "./Header.module.scss"
import { ActionBlock } from "../ActionBlockComponent/ActionBlock"
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
                    <ActionBlock />
                    <div className={styles.avaBlock}>
                        <img src={imgAva} alt="imgAva" />
                        <p className={styles.nickName}>{name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}