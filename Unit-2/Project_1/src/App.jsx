import "./App.css";
import Header from "./Header.jsx";
import Profile from "./Profile.jsx";
import About from "./About.jsx";
import Skills from "./Skills.jsx";
import Goal from "./Goal.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

function App() {
  const profile = {
    name: "Reyasri R",
    age: 18,
    college: "Prince Dr. K. Vasudevan College of Engineering and Technology",
    department: "B.E Computer science engineering",
  };

  const about =
    "I am an passionate computer science student with a strong interest in web development, UI/UX design, Java, Python, and React.";

  const skills = [
    "Java",
    "Python",
    "UI/UX",
    "React",
    "HTML",
    "CSS",
    "JavaScript"

  ];

  const goal =
    "My career objective is to become a skilled Full Stack Developer and UI/UX Designer while continuously improving my technical and problem-solving skills.";

  const contact = {
    email: "reyasri123@example.com",
    phone: "1234567890",
    github: "https://github.com/reyasri",
  };

  return (
    <div className="container">
      <Header
        title="STUDENT DASHBOARD"
        subtitle="Welcome to My Portfolio"
      />

      <Profile
        name={profile.name}
        age={profile.age}
        college={profile.college}
        department={profile.department}
      />
      <div className="about-skills">

        <About introduction={about} />

        <Skills skills={skills} />
      </div>
      <Goal goal={goal} />

      <Contact
        email={contact.email}
        phone={contact.phone}
        github={contact.github}
      />

      <Footer message="Thank you for visiting my personal introduction page." />
    </div>
  );
}

export default App;