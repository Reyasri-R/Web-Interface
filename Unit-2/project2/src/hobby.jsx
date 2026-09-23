function Hobby(props) {
    return (
        <div className="hobby-card">
            <img
                src={props.image}
                alt={props.name}
            />

            <h2>{props.name}</h2>
            <p>{props.desc}</p>
        </div>
    );
}

export default Hobby;