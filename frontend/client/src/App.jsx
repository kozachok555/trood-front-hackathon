import styles from "./App.module.scss";
import { Routes, Route } from "react-router";
import { MainPage } from "./Components/MainPageComponent/MainPage";
import { NoPage } from "./Components/NoPageComponent/NoPage";
import { Header } from "./Components/HeaderComponent/Header";
import { Nav } from "./Components/NavComponent/Nav";
import { Projects } from "./Components/ProjectsComponent/Projects";
import { Vacancies } from "./Components/VacanciesComponent/Vacancies";
import { Create } from "./Components/ProjectsComponent/CreateComponent/Create";
import { Project } from "./Components/ProjectsComponent/ProjectComponent/Project";
function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.Main}>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/projects/create-project" element={<Create />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
