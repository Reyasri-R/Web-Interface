function About(props) {
  return (
    <section>
      <div className="card2">
        <h2>About Me</h2>
        <p>{props.introduction}</p>
      </div>
    </section >
  );
}

export default About;