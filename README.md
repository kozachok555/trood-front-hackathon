# Trood Front
A web application for managing projects with functionality to create, edit, and delete projects. Projects are divided into active and completed, with data saved in `localStorage` and synced with a backend server.

[Open Deployed App](http://troodtest.zzz.com.ua)

🛠️ Tech Stack

### Frontend:
- **React**
- **React Router**
- **React Final Form**
- **SCSS Modules**
- **JavaScript (ES6+)**

### Backend Api Link:
- [Available here](https://backend-trood-test-1.onrender.com) (based on fetch requests used in the code)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kozakch0k55/trood-front-hackathon.git
cd trood-front-hackathon
````
### 2.  Install Dependencies
```bash
npm install
````
### 2.  Start the Dev Server
```bash
npm start
````

📦 Features

Display of active and completed projects.
Create new project with fields for area, experience, deadline, and description.
Edit existing projects.
Delete projects.
Cache data in localStorage for improved performance.
Highlight expired deadlines.


🔗 API

Backend available at:
```bash
https://backend-trood-test-1.onrender.com/projects
````

Available endpoints:

GET /projects

POST /projects

PUT /projects/:id

DELETE /projects/:id
