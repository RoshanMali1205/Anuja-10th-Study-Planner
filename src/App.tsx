import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import SubjectPage from './components/SubjectPage'
import type { Subject } from './types'

import mathData from './data/mathematics.json'
import scienceData from './data/science.json'
import socialData from './data/socialScience.json'
import englishData from './data/english.json'
import sanskritData from './data/sanskrit.json'

const subjects: Subject[] = [
  mathData,
  scienceData,
  socialData,
  englishData,
  sanskritData,
] as Subject[]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage subjects={subjects} />} />
      <Route path="/subject/:subjectId" element={<SubjectPage subjects={subjects} />} />
    </Routes>
  )
}
