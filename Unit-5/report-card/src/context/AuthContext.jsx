import { useEffect, useState } from 'react'
import { initialStudents } from '../data/students.js'
import { AuthContext } from './authContext.js'

const STUDENTS_KEY = 'reportCardStudents'
const USER_KEY = 'loggedInUser'

function readStoredValue(key, fallback) {
    try {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : fallback
    } catch {
        localStorage.removeItem(key)
        return fallback
    }
}

export function AuthProvider({ children }) {
    const [students, setStudents] = useState(() => readStoredValue(STUDENTS_KEY, initialStudents))
    const [user, setUser] = useState(() => readStoredValue(USER_KEY, null))
    const [sessionChecked] = useState(true)

    useEffect(() => {
        function syncAcrossTabs(event) {
            if (event.key === USER_KEY) setUser(event.newValue ? JSON.parse(event.newValue) : null)
            if (event.key === STUDENTS_KEY && event.newValue) setStudents(JSON.parse(event.newValue))
        }
        window.addEventListener('storage', syncAcrossTabs)
        return () => window.removeEventListener('storage', syncAcrossTabs)
    }, [])

    useEffect(() => {
        if (sessionChecked) localStorage.setItem(STUDENTS_KEY, JSON.stringify(students))
    }, [students, sessionChecked])

    function login(username, password) {
        if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
            const admin = { role: 'admin', name: 'Portal Administrator' }
            localStorage.setItem(USER_KEY, JSON.stringify(admin))
            setUser(admin)
            return { success: true, destination: '/admin' }
        }

        const student = students.find(
            (record) => record.registerNumber.toLowerCase() === username.trim().toLowerCase(),
        )
        if (!student || student.dob !== password.trim()) {
            return { success: false, message: 'Register number or date of birth is incorrect.' }
        }

        const signedInStudent = { role: 'student', registerNumber: student.registerNumber }
        localStorage.setItem(USER_KEY, JSON.stringify(signedInStudent))
        setUser(signedInStudent)
        return { success: true, destination: '/student' }
    }

    function logout() {
        localStorage.removeItem(USER_KEY)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            students,
            setStudents,
            user,
            sessionChecked,
            login,
            logout,
            currentStudent: students.find((student) => student.registerNumber === user?.registerNumber) ?? null,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
