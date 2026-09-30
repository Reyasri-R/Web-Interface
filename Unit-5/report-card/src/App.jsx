import { useEffect, useMemo, useState } from 'react'
import { HashRouter, Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { useAuth } from './context/useAuth.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { getResultSummary, makeEmptySemester } from './data/students.js'
import './portal.css'

const collegeName = 'PRINCE DR. K. VASUDEVAN COLLEGE OF ENGINEERING AND TECHNOLOGY'
const semesterLabel = (number) => `Semester ${number}`

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute role="admin" />}>
            <Route element={<PortalLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/students" element={<StudentList />} />
              <Route path="/admin/student/:registerNumber" element={<AdminStudentReport />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute role="student" />}>
            <Route element={<PortalLayout />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/semester/1" element={<StudentSemester number={1} />} />
              <Route path="/student/semester/2" element={<StudentSemester number={2} />} />
              <Route path="/student/report" element={<StudentFullReport />} />
            </Route>
          </Route>
          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}

function HomeRedirect() {
  const { user, sessionChecked } = useAuth()
  if (!sessionChecked) return <Loading />
  return <Navigate to={user ? (user.role === 'admin' ? '/admin' : '/student') : '/login'} replace />
}

function Login() {
  const { user, sessionChecked, login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionChecked && user) navigate(user.role === 'admin' ? '/admin' : '/student', { replace: true })
  }, [navigate, sessionChecked, user])

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!username.trim() || !password.trim()) {
      setError('Enter both your register number and date of birth.')
      return
    }
    setLoading(true)
    window.setTimeout(() => {
      const result = login(username, password)
      setLoading(false)
      if (result.success) navigate(result.destination, { replace: true })
      else setError(result.message)
    }, 350)
  }

  if (!sessionChecked) return <Loading />
  return (
    <main className="login-page">
      <aside className="login-aside">
        <div className="college-mark">PV</div>
        <p className="eyebrow">STUDENT SERVICES · ACADEMIC RECORDS</p>
        <h1>Every result.<br /><em>In its place.</em></h1>
        <p className="login-aside-copy">A clear view of your academic progress, semester by semester.</p>
        <div className="aside-bottom"><span>EST. 2001</span><span>CHENNAI, INDIA</span></div>
      </aside>
      <section className="login-panel">
        <div className="login-form-wrap">
          <p className="eyebrow accent-text">ACADEMIC PORTAL</p>
          <h2>Welcome back</h2>
          <p className="muted">Sign in with your college credentials.</p>
          <form onSubmit={handleSubmit} className="login-form">
            <label>Register number<input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="e.g. 25CS062" /></label>
            <label>Date of birth<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="DD-MM-YYYY" /></label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary button-wide" disabled={loading}>{loading ? 'Checking credentials…' : 'Sign in'}<span aria-hidden="true">↗</span></button>
          </form>
          <p className="login-note">Administrator? Use your admin account on this page.</p>
          <div className="demo-box"><strong>Demo access</strong><span>Student: 25CS062 / 21-04-2008</span><span>Admin: admin / admin123</span></div>
        </div>
        <footer className="login-footer">© 2026 Prince Dr. K. Vasudevan College of Engineering and Technology</footer>
      </section>
    </main>
  )
}

function PortalLayout() {
  const { user, currentStudent, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const admin = user?.role === 'admin'
  const links = admin
    ? [{ to: '/admin', label: 'Overview' }, { to: '/admin/students', label: 'Students' }]
    : [{ to: '/student', label: 'Overview' }, { to: '/student/report', label: 'Full report' }]
  return (
    <div className="portal-shell">
      <header className="topbar">
        <Link to={admin ? '/admin' : '/student'} className="brand"><span className="brand-mark">PV</span><span><strong>PRINCE</strong><small>ACADEMIC PORTAL</small></span></Link>
        <nav className="topnav" aria-label="Main navigation">{links.map((link) => <Link key={link.to} to={link.to} className={location.pathname === link.to ? 'active' : ''}>{link.label}</Link>)}</nav>
        <div className="account-area"><div className="account-avatar">{admin ? 'A' : currentStudent?.name?.charAt(0) ?? 'S'}</div><span className="account-name">{admin ? 'Administrator' : currentStudent?.name}</span><button className="button button-quiet" onClick={() => { logout(); navigate('/login', { replace: true }) }}>Log out</button></div>
      </header>
      <main className="page-content"><Outlet /></main>
      <footer className="portal-footer"><span>PRINCE DR. K. VASUDEVAN COLLEGE OF ENGINEERING AND TECHNOLOGY</span><span>ACADEMIC RECORDS · 2026</span></footer>
    </div>
  )
}

function PageHeading({ eyebrow, title, detail, action }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{detail && <p className="muted heading-detail">{detail}</p>}</div>{action}</div>
}

function Loading() {
  return <div className="loading-state"><span className="loader" />Loading your portal…</div>
}

function StudentDashboard() {
  const { currentStudent } = useAuth()
  if (!currentStudent) return <Loading />
  return (
    <>
      <PageHeading eyebrow="STUDENT OVERVIEW" title={`Welcome, ${currentStudent.name.split(' ')[0]}.`} detail="Your academic record, all in one place." />
      <section className="identity-strip">
        <div><span className="field-label">REGISTER NUMBER</span><strong>{currentStudent.registerNumber}</strong></div>
        <div><span className="field-label">DEPARTMENT</span><strong>{currentStudent.department}</strong></div>
        <div><span className="field-label">ACADEMIC YEAR</span><strong>{currentStudent.year}</strong></div>
        <div><span className="field-label">DATE OF BIRTH</span><strong>{currentStudent.dob}</strong></div>
      </section>
      <div className="section-heading"><div><p className="eyebrow">YOUR PROGRESS</p><h2>Semester results</h2></div><Link className="text-link" to="/student/report">View full report <span>↗</span></Link></div>
      <div className="semester-grid">{[1, 2].map((number) => {
        const result = getResultSummary(currentStudent[`semester${number}`])
        return <article className={`semester-card semester-${number}`} key={number}>
          <div className="semester-card-head"><span className="semester-number">0{number}</span><span className={`status-pill ${result.status === 'PASS' ? 'status-pass' : 'status-empty'}`}>{result.status}</span></div>
          <p className="card-kicker">ACADEMIC SESSION · 2025–26</p><h3>{semesterLabel(number)}</h3>
          {result.subjects.length ? <><div className="result-stats"><div><strong>{result.cgpa.toFixed(1)}</strong><span>CGPA</span></div><div><strong>{result.percentage}%</strong><span>Percentage</span></div><div><strong>{result.total}</strong><span>Total marks</span></div></div><div className="progress-track"><span style={{ width: `${result.percentage}%` }} /></div></> : <p className="empty-result">Results have not been published yet.</p>}
          <Link to={`/student/semester/${number}`} className="card-link">View semester result <span>→</span></Link>
        </article>
      })}</div>
      <div className="notice-line"><span className="notice-dot" />Your result records are private and visible only to your account.</div>
    </>
  )
}

function StudentSemester({ number }) {
  const { currentStudent } = useAuth()
  if (!currentStudent) return <Loading />
  const result = currentStudent[`semester${number}`]
  return <><PageHeading eyebrow={`ACADEMIC RECORD · SEMESTER 0${number}`} title={semesterLabel(number)} detail="Subject-wise marks and final result." action={<Link className="button button-outline" to="/student/report">Full report</Link>} /><ReportSection student={currentStudent} number={number} result={result} /></>
}

function StudentFullReport() {
  const { currentStudent } = useAuth()
  if (!currentStudent) return <Loading />
  return <><PageHeading eyebrow="OFFICIAL ACADEMIC RECORD" title="Student report card" detail="Consolidated semester performance." action={<button className="button button-outline" onClick={() => window.print()}>Print report</button>} /><ReportCard student={currentStudent} /></>
}

function ReportSection({ student, number, result }) {
  const summary = getResultSummary(result)
  return <section className="report-section">
    <div className="report-section-head"><div><span className="report-overline">SEMESTER 0{number} · 2025–26</span><h2>{semesterLabel(number)} results</h2></div><span className={`status-pill ${summary.status === 'PASS' ? 'status-pass' : 'status-empty'}`}>{summary.status}</span></div>
    <div className="table-wrap"><table><thead><tr><th>Subject code</th><th>Subject name</th><th>Internal</th><th>External</th><th>Total</th><th>Grade</th></tr></thead><tbody>{result.subjects.length ? result.subjects.map((item) => <tr key={item.code}><td className="subject-code">{item.code}</td><td className="subject-name">{item.name}</td><td>{item.internal}</td><td>{item.external}</td><td className="mark-total">{item.total}</td><td><span className="grade-tag">{item.grade}</span></td></tr>) : <tr><td className="empty-table" colSpan="6">No marks have been published for this semester.</td></tr>}</tbody></table></div>
    <ResultTotals result={summary} />
    <p className="report-student-line">Record for <strong>{student.name}</strong> · {student.registerNumber}</p>
  </section>
}

function ResultTotals({ result }) {
  return <div className="totals-grid"><div><span>TOTAL MARKS</span><strong>{result.total}<small> / {result.subjects.length * 100}</small></strong></div><div><span>PERCENTAGE</span><strong>{result.percentage}%</strong></div><div><span>CGPA</span><strong>{Number(result.cgpa || 0).toFixed(1)}</strong></div><div><span>RESULT STATUS</span><strong className={result.status === 'PASS' ? 'pass-text' : ''}>{result.status}</strong></div></div>
}

function ReportCard({ student }) {
  return <article className="official-report">
    <div className="report-masthead"><div className="report-seal">PV</div><div><p className="report-overline">ACADEMIC TRANSCRIPT</p><h2>{collegeName}</h2><p>Student Academic Report Card · Academic Year 2025–26</p></div></div>
    <div className="report-identity"><div><span>STUDENT NAME</span><strong>{student.name}</strong></div><div><span>REGISTER NUMBER</span><strong>{student.registerNumber}</strong></div><div><span>DEPARTMENT</span><strong>{student.department}</strong></div><div><span>YEAR</span><strong>{student.year}</strong></div><div><span>DATE OF BIRTH</span><strong>{student.dob}</strong></div></div>
    {[1, 2].map((number) => <ReportSection key={number} student={student} number={number} result={student[`semester${number}`]} />)}
    <div className="report-signoff"><span>Generated from the Academic Portal</span><span>Registrar · Academic Affairs</span></div>
  </article>
}

function AdminDashboard() {
  const { students } = useAuth()
  const semester1Count = students.filter((student) => student.semester1.subjects.length > 0).length
  const semester2Count = students.filter((student) => student.semester2.subjects.length > 0).length
  return <>
    <PageHeading eyebrow="ADMINISTRATION" title="Admin dashboard" detail="Manage student records and academic results." action={<Link to="/admin/students" className="button button-primary">+ Add student</Link>} />
    <div className="admin-stats"><StatTile label="TOTAL STUDENTS" value={students.length} note="Enrolled records" accent="mint" /><StatTile label="SEMESTER 1 RESULTS" value={semester1Count} note="Records published" accent="blue" /><StatTile label="SEMESTER 2 RESULTS" value={semester2Count} note="Records published" accent="orange" /></div>
    <div className="section-heading admin-section-heading"><div><p className="eyebrow">LATEST RECORDS</p><h2>Student directory</h2></div><Link className="text-link" to="/admin/students">Manage all students <span>↗</span></Link></div>
    <StudentTable students={students.slice(0, 5)} />
  </>
}

function StatTile({ label, value, note, accent }) {
  return <article className={`stat-tile stat-${accent}`}><span className="stat-accent" /><span className="field-label">{label}</span><strong>{value}</strong><span className="stat-note">{note}</span></article>
}

function StudentList() {
  const { students, setStudents } = useAuth()
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const filteredStudents = useMemo(() => students.filter((student) => `${student.registerNumber} ${student.name}`.toLowerCase().includes(search.toLowerCase().trim())), [search, students])

  function saveStudent(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const record = {
      registerNumber: form.get('registerNumber').trim().toUpperCase(),
      name: form.get('name').trim(), dob: form.get('dob').trim(),
      department: form.get('department').trim(), year: form.get('year').trim(),
      email: form.get('email').trim(),
      ...(editing ? { semester1: editing.semester1, semester2: editing.semester2 } : { semester1: makeEmptySemester(), semester2: makeEmptySemester() }),
    }
    if (editing) setStudents((items) => items.map((item) => item.registerNumber === editing.registerNumber ? record : item))
    else setStudents((items) => [...items, record])
    setModalOpen(false)
    setEditing(null)
  }

  function deleteStudent(student) {
    if (window.confirm(`Delete ${student.name} (${student.registerNumber}) and their result records?`)) {
      setStudents((items) => items.filter((item) => item.registerNumber !== student.registerNumber))
    }
  }

  function openEdit(student = null) { setEditing(student); setModalOpen(true) }
  return <>
    <PageHeading eyebrow="STUDENT RECORDS" title="Student directory" detail={`${students.length} student records in the academic register.`} action={<button className="button button-primary" onClick={() => openEdit()}>+ Add student</button>} />
    <div className="directory-toolbar"><label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Search students" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name or register number" /></label><span className="result-count">{filteredStudents.length} {filteredStudents.length === 1 ? 'record' : 'records'}</span></div>
    <StudentTable students={filteredStudents} onEdit={openEdit} onDelete={deleteStudent} />
    {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="student-form-title"><div className="modal-head"><div><p className="eyebrow">ACADEMIC REGISTER</p><h2 id="student-form-title">{editing ? 'Edit student' : 'Add student'}</h2></div><button className="icon-button" aria-label="Close" onClick={() => setModalOpen(false)}>×</button></div><form className="student-form" onSubmit={saveStudent}><label>Register number<input name="registerNumber" defaultValue={editing?.registerNumber} required pattern="[A-Za-z0-9-]+" disabled={Boolean(editing)} /></label><label>Full name<input name="name" defaultValue={editing?.name} required /></label><label>Date of birth<input name="dob" defaultValue={editing?.dob} placeholder="DD-MM-YYYY" required pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}" /></label><label>Department<input name="department" defaultValue={editing?.department} required /></label><label>Year<input name="year" defaultValue={editing?.year} placeholder="2nd Year" required /></label><label>Email address<input type="email" name="email" defaultValue={editing?.email} /></label><div className="modal-actions"><button type="button" className="button button-quiet" onClick={() => setModalOpen(false)}>Cancel</button><button className="button button-primary">{editing ? 'Save changes' : 'Create record'}</button></div></form></section></div>}
  </>
}

function StudentTable({ students, onEdit, onDelete }) {
  return <div className="table-wrap directory-table-wrap"><table className="directory-table"><thead><tr><th>REGISTER NO.</th><th>STUDENT</th><th>DEPARTMENT</th><th>YEAR</th><th className="actions-header">ACTIONS</th></tr></thead><tbody>{students.length ? students.map((student) => <tr key={student.registerNumber}><td className="subject-code">{student.registerNumber}</td><td><div className="student-cell"><span className="student-initial">{student.name.charAt(0)}</span><span><strong>{student.name}</strong><small>{student.email || 'Student account'}</small></span></div></td><td>{student.department}</td><td>{student.year}</td><td><div className="row-actions"><Link className="action-link" to={`/admin/student/${encodeURIComponent(student.registerNumber)}`}>View</Link>{onEdit && <button className="action-link" onClick={() => onEdit(student)}>Edit</button>}{onDelete && <button className="action-link action-danger" onClick={() => onDelete(student)}>Delete</button>}</div></td></tr>) : <tr><td colSpan="5" className="empty-table">No students match your search.</td></tr>}</tbody></table></div>
}

function AdminStudentReport() {
  const { registerNumber } = useParams()
  const { students, setStudents } = useAuth()
  const student = students.find((item) => item.registerNumber.toLowerCase() === decodeURIComponent(registerNumber).toLowerCase())
  if (!student) return <><PageHeading eyebrow="STUDENT RECORD" title="Record not found" detail="This register number is not in the student directory." /><Link to="/admin/students" className="button button-outline">Back to directory</Link></>
  function saveSemester(number, result) {
    const subjects = result.subjects.map((item) => ({ ...item, internal: Number(item.internal) || 0, external: Number(item.external) || 0, total: (Number(item.internal) || 0) + (Number(item.external) || 0) }))
    const total = subjects.reduce((sum, item) => sum + item.total, 0)
    const next = { subjects, total, percentage: subjects.length ? Number((total / (subjects.length * 100) * 100).toFixed(1)) : 0, cgpa: Number(result.cgpa) || 0 }
    setStudents((items) => items.map((item) => item.registerNumber === student.registerNumber ? { ...item, [`semester${number}`]: next } : item))
  }
  return <><PageHeading eyebrow="STUDENT RECORD" title={student.name} detail={`${student.registerNumber} · ${student.department}`} action={<Link to="/admin/students" className="button button-outline">← Directory</Link>} /><div className="admin-record-actions"><span>Manage subject marks and semester results</span></div><ReportCard student={student} /><div className="mark-edit-grid">{[1, 2].map((number) => <SemesterEditor key={number} number={number} value={student[`semester${number}`]} onSave={(value) => saveSemester(number, value)} />)}</div></>
}

function SemesterEditor({ number, value, onSave }) {
  const [subjects, setSubjects] = useState(value.subjects)
  const [cgpa, setCgpa] = useState(value.cgpa)
  const [saved, setSaved] = useState(false)
  function update(index, key, nextValue) { setSubjects((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: nextValue } : item)); setSaved(false) }
  function addSubject() { setSubjects((items) => [...items, { code: '', name: '', internal: 0, external: 0, total: 0, grade: '' }]); setSaved(false) }
  return <section className="editor-panel"><div className="editor-head"><div><p className="eyebrow">RESULT MANAGEMENT</p><h2>{semesterLabel(number)}</h2></div><label className="cgpa-input">CGPA<input type="number" min="0" max="10" step="0.1" value={cgpa} onChange={(event) => { setCgpa(event.target.value); setSaved(false) }} /></label></div><div className="editor-subjects">{subjects.map((item, index) => <div className="editor-row" key={`${item.code}-${index}`}><input aria-label="Subject code" placeholder="Code" value={item.code} onChange={(event) => update(index, 'code', event.target.value)} /><input aria-label="Subject name" placeholder="Subject name" value={item.name} onChange={(event) => update(index, 'name', event.target.value)} /><input aria-label="Internal marks" type="number" min="0" max="30" placeholder="Internal" value={item.internal} onChange={(event) => update(index, 'internal', event.target.value)} /><input aria-label="External marks" type="number" min="0" max="70" placeholder="External" value={item.external} onChange={(event) => update(index, 'external', event.target.value)} /><input aria-label="Grade" placeholder="Grade" value={item.grade} onChange={(event) => update(index, 'grade', event.target.value)} /><button className="remove-subject" aria-label={`Remove ${item.name || 'subject'}`} onClick={() => { setSubjects((items) => items.filter((_, itemIndex) => itemIndex !== index)); setSaved(false) }}>×</button></div>)}</div><div className="editor-actions"><button className="text-link" onClick={addSubject}>+ Add subject</button><span>{saved && <span className="saved-label">Saved</span>}<button className="button button-primary" onClick={() => { onSave({ subjects, cgpa }); setSaved(true) }}>Save {semesterLabel(number)}</button></span></div></section>
}

export default App
