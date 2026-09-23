function Skills(props) {
    return (
        <section>
            <div className="card2">
                <h2>Technical Skills</h2>

                <ul className="skills-list">
                    {props.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Skills;