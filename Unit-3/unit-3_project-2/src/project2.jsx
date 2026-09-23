import { useState } from "react";
import "./App.css";

function Project2() {

    const [students, setStudents] = useState([
        { id: 1, name: "Reyasri", status: "Absent" },
        { id: 2, name: "Jahnvi", status: "Absent" },
        { id: 3, name: "Riya", status: "Absent" },
        { id: 4, name: "Priya", status: "Absent" },
        { id: 5, name: "Anu", status: "Absent" },
        { id: 6, name: "Pooja", status: "Absent" },
        { id: 7, name: "Dhivakar", status: "Absent" },
        { id: 8, name: "Lawrence", status: "Absent" },
        { id: 9, name: "Sheema", status: "Absent" },
        { id: 10, name: "Sam", status: "Absent" },
        { id: 11, name: "Jenifer", status: "Absent" },
        { id: 12, name: "Banu", status: "Absent" },
        { id: 13, name: "sonali", status: "Absent" },
        { id: 14, name: "janakhi", status: "Absent" },
        { id: 15, name: "Sanjeevan", status: "Absent" }
    ]);


    const markAttendance = (id, status) => {
        setStudents(
            students.map((student) =>
                student.id === id
                    ? { ...student, status: status }
                    : student
            )
        );
    };

    const total = students.length;

    const present = students.filter(
        (student) => student.status === "Present"
    ).length;

    const absent = students.filter(
        (student) => student.status === "Absent"
    ).length;

    return (
        <div className="attendance">

            <h1>Student Attendance Tracker</h1>

            <h3>Total: {total}</h3>
            <h3>Present: {present}</h3>
            <h3>Absent: {absent}</h3>

            {students.map((student) => (
                <div className="student" key={student.id}>

                    <p>
                        {student.name} - {student.status}
                    </p>

                    <div>
                        <button
                            onClick={() =>
                                markAttendance(student.id, "Present")
                            }
                        >
                            Present
                        </button>

                        <button
                            onClick={() =>
                                markAttendance(student.id, "Absent")
                            }
                        >
                            Absent
                        </button>
                    </div>

                </div>
            ))}

        </div>
    );
}

export default Project2;