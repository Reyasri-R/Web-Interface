import { useState } from "react";
import "./App.css";

function Calculator() {
    const [value, setValue] = useState("");

    const click = (v) => {
        setValue(value + v);
    };

    const calculate = () => {
        setValue(eval(value));
    };

    return (
        <div className="calculator">

            <input value={value} readOnly />

            <div className="buttons">
                <button onClick={() => setValue("")}>C</button>
                <button onClick={() => click("9")}>9</button>
                <button onClick={() => click("8")}>8</button>
                <button onClick={() => click("/")}>/</button>

                <button onClick={() => click("7")}>7</button>
                <button onClick={() => click("6")}>6</button>
                <button onClick={() => click("5")}>5</button>
                <button onClick={() => click("+")}>+</button>

                <button onClick={() => click("4")}>4</button>
                <button onClick={() => click("3")}>3</button>
                <button onClick={() => click("2")}>2</button>
                <button onClick={() => click("*")}>*</button>

                <button onClick={() => click("1")}>1</button>
                <button onClick={() => click(".")}>.</button>
                <button onClick={calculate}>=</button>
                <button onClick={() => click("-")}>-</button>

            </div>

        </div>
    );
}

export default Calculator;
