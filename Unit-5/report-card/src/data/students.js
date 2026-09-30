const subject = (code, name, internal, external, grade) => ({
    code,
    name,
    internal,
    external,
    total: internal + external,
    grade,
})

const semester = (subjects, cgpa) => {
    const total = subjects.reduce((sum, item) => sum + item.total, 0)
    const maximum = subjects.length * 100
    return {
        subjects,
        total,
        percentage: maximum ? Number(((total / maximum) * 100).toFixed(1)) : 0,
        cgpa,
    }
}

export const initialStudents = [
    {
        registerNumber: '25CS062',
        name: 'Reyasri R',
        dob: '21-04-2008',
        department: 'Computer Science Engineering',
        year: '2nd Year',
        email: 'reyasri.r@student.prince.edu',
        semester1: semester([
            subject('MA101', 'Engineering Mathematics', 25, 70, 'O'),
            subject('CS101', 'Programming in C', 23, 65, 'A+'),
            subject('PH101', 'Engineering Physics', 22, 64, 'A+'),
            subject('CY101', 'Engineering Chemistry', 24, 68, 'O'),
            subject('ME101', 'Engineering Mechanics', 21, 61, 'A'),
        ], 9.1),
        semester2: semester([
            subject('MA201', 'Discrete Mathematics', 24, 69, 'O'),
            subject('CS201', 'Data Structures', 25, 67, 'O'),
            subject('CS202', 'Digital Fundamentals', 22, 65, 'A+'),
            subject('EC201', 'Computer Organization', 23, 63, 'A+'),
            subject('HS201', 'Technical Communication', 24, 66, 'O'),
        ], 8.9),
    },
    {
        registerNumber: '25CS018',
        name: 'Aadhavan S',
        dob: '08-11-2007',
        department: 'Computer Science Engineering',
        year: '2nd Year',
        email: 'aadhavan.s@student.prince.edu',
        semester1: semester([
            subject('MA101', 'Engineering Mathematics', 22, 63, 'A+'),
            subject('CS101', 'Programming in C', 24, 68, 'O'),
            subject('PH101', 'Engineering Physics', 20, 58, 'A'),
            subject('CY101', 'Engineering Chemistry', 23, 65, 'A+'),
            subject('ME101', 'Engineering Mechanics', 19, 57, 'A'),
        ], 8.4),
        semester2: semester([
            subject('MA201', 'Discrete Mathematics', 21, 61, 'A'),
            subject('CS201', 'Data Structures', 23, 66, 'A+'),
            subject('CS202', 'Digital Fundamentals', 21, 60, 'A'),
            subject('EC201', 'Computer Organization', 22, 64, 'A+'),
            subject('HS201', 'Technical Communication', 20, 59, 'A'),
        ], 8.2),
    },
    {
        registerNumber: '25EC034',
        name: 'Nivetha P',
        dob: '16-02-2008',
        department: 'Electronics and Communication Engineering',
        year: '2nd Year',
        email: 'nivetha.p@student.prince.edu',
        semester1: semester([
            subject('MA101', 'Engineering Mathematics', 23, 66, 'A+'),
            subject('EC101', 'Circuit Analysis', 25, 71, 'O'),
            subject('PH101', 'Engineering Physics', 24, 68, 'O'),
            subject('CY101', 'Engineering Chemistry', 22, 63, 'A+'),
            subject('ME101', 'Engineering Mechanics', 20, 60, 'A'),
        ], 8.8),
        semester2: semester([
            subject('MA201', 'Applied Mathematics', 24, 67, 'O'),
            subject('EC201', 'Electronic Devices', 23, 66, 'A+'),
            subject('EC202', 'Signals and Systems', 22, 64, 'A+'),
            subject('CS201', 'Programming Fundamentals', 21, 62, 'A'),
            subject('HS201', 'Technical Communication', 25, 69, 'O'),
        ], 8.7),
    },
]

export const getResultSummary = (result) => {
    const subjectCount = result.subjects.length
    const maximum = subjectCount * 100
    const percentage = maximum ? Number(((result.total / maximum) * 100).toFixed(1)) : 0
    const status = subjectCount === 0 ? 'PENDING' : result.subjects.every((item) => item.total >= 40) ? 'PASS' : 'FAIL'
    return { ...result, percentage, status }
}

export const makeEmptySemester = () => ({ subjects: [], total: 0, percentage: 0, cgpa: 0 })
