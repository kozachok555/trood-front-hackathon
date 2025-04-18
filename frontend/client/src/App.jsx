import styles from "./App.module.scss";
import { Routes, Route } from "react-router";
import { MainPage } from "./Components/MainPageComponent/MainPage";
import { NoPage } from "./Components/NoPageComponent/NoPage";
import { Header } from "./Components/HeaderComponent/Header";
import { Nav } from "./Components/NavComponent/Nav";
import { Projects } from "./Components/ProjectsComponent/Projects";
import { Vacancies } from "./Components/VacanciesComponent/Vacancies";
function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.Main}>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
