import { useState } from "react";
function FormValidation() {
    const [name, setName] = useState("");
    const [aadharName, setAadharName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [pincode, setPincode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [currentAddress, setCurrentAddress] = useState("");
    const [sameAddress, setSameAddress] = useState(false);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const handleSameAddress = (e) => {
        setSameAddress(e.target.checked);
        if (e.target.checked) {
            setCurrentAddress(permanentAddress);
        }
        else {
            setCurrentAddress("");
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === "") {
            alert("Please enter your name");
            return;
        }
        if (aadharName === "") {
            alert("Please enter Aadhaar name");
            return;
        }
        if (name.toLowerCase() !== aadharName.toLowerCase()) {
            alert("Name and Aadhaar Name must be the same");
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email");
            return;
        }
        if (!/^\d{10}$/.test(phone)) {
            alert("Phone number must contain exactly 10 digits");
            return;
        }
        if (dob === "") {
            alert("Please select Date of Birth");
            return;
        }
        if (gender === "") {
            alert("Please select Gender");
            return;
        }
        if (course === "") {
            alert("Please select Course");
            return;
        }
        if (!/^\d{6}$/.test(pincode)) {
            alert("Pincode must contain exactly 6 digits");
            return;
        }
        if (password === "") {
            alert("Please enter password");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (permanentAddress === "") {
            alert("Please enter permanent address");
            return;
        }
        if (currentAddress === "") {
            alert("Please enter current address");
            return;
        }
        if (!file) {
            alert("Please upload a file");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert("File size must be less than 2 MB");
            return;
        }
        setMessage("Form submitted successfully!");
    };
    const handleClear = () => {
        setName("");
        setAadharName("");
        setEmail("");
        setPhone("");
        setDob("");
        setGender("");
        setCourse("");
        setPincode("");
        setPassword("");
        setConfirmPassword("");
        setPermanentAddress("");
        setCurrentAddress("");
        setSameAddress(false);
        setFile(null);
        setMessage("");
    };
    return (
        <div className="container">
            <h1>Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" />
                <label>Aadhaar Name</label>
                <input type="text"
                    value={aadharName}
                    onChange={(e) => setAadharName(e.target.value)}
                    placeholder="Enter name as in Aadhaar" />
                <label>Email</label>
                <input type="text"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email" />
                <label>Phone Number</label>
                <input type="text"
                    value={phone}
                    maxLength="10"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10 digit phone number" />
                <label>Date of Birth</label>
                <input type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)} />
                <label>Gender</label>
                <select value={gender}
                    onChange={(e) => setGender(e.target.value)} >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <label>Course</label>
                <select value={course}
                    onChange={(e) => setCourse(e.target.value)} >
                    <option value="">Select Course</option>
                    <option value="CSE">Computer Science Engineering</option>
                    <option value="ECE">Electronics and Communication</option>
                    <option value="EEE">Electrical and Electronics</option>
                    <option value="IT">Information Technology</option>
                </select>
                <label>Pincode</label>
                <input type="text"
                    value={pincode}

                    maxLength="6"
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6 digit pincode" />
                <label>New Password</label>
                <input type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password" />
                <label>Confirm Password</label>
                <input type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password" />
                <label>Permanent Address</label>
                <textarea value={permanentAddress}
                    onChange={(e) => setPermanentAddress(e.target.value)}
                    placeholder="Enter permanent address" />
                <label className="checkbox">
                    <input type="checkbox"
                        checked={sameAddress}
                        onChange={handleSameAddress} /> Same as Permanent Address </label>
                <label>Current Address</label>
                <textarea value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    placeholder="Enter current address" />
                <label>Upload File</label>
                <input type="file"
                    onChange={(e) => setFile(e.target.files[0])} />
                <p>Maximum file size: 2 MB</p>
                <div className="buttons">
                    <button type="submit">Submit</button>
                    <button type="button"
                        onClick={handleClear}> Clear </button>
                </div>
                {message && <h3 className="success">{message}</h3>}
            </form>
        </div>
    );
} export default FormValidation;