function Goal(props) {
    return (
        <section className="card">
            <h2>Goals</h2>
            <p>{props.goal}</p>
        </section>
    );
}

export default Goal;