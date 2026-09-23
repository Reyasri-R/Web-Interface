import books from "./assets/books.jpeg";
import batminton from "./assets/badminton.jpeg";
import music from "./assets/music.jpeg";
import photo from "./assets/photos.jpeg";
import football from "./assets/Football.jpeg";
import cooking from "./assets/cooking.jpg";

import Hobby from "./hobby.jsx";

import "./App.css";

function App() {
  return (
    <div className="hobby-container" >

      <Hobby
        name="Reading"
        desc="I love reading books."
        image={books}
      />

      <Hobby
        name="Music"
        desc="I enjoy listening to music."
        image={music}
      />

      <Hobby
        name="Football"
        desc="I love playing football."
        image={football}
      />

      <Hobby
        name="games"
        desc="I enjoy playing games."
        image={batminton}
      />
      <Hobby
        name="Photography"
        desc="I like taking photographs."
        image={photo}
      />
      <Hobby
        name="Cooking"
        desc="I enjoy trying new recipes."
        image={cooking}
      />
    </div>
  );
}
export default App;