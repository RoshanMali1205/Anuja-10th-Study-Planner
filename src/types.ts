export interface Chapter {
  id: string
  number: number | string
  title: string
  topics: string[]
  formulas?: string[]
  tips?: string[]
  importantQuestions?: string[]
  weightage?: string
  equations?: string[]
  diagrams?: string[]
  keywords?: string[]
  dates?: string[]
  timeline?: string[]
  summary?: string
  shlokas?: string[]
  meanings?: string[]
  rules?: string[]
  examples?: string[]
}

export interface SubjectSection {
  id: string
  title: string
  chapters: Chapter[]
}

export interface Subject {
  id: string
  name: string
  icon: string
  color: string
  sections?: SubjectSection[]
  chapters?: Chapter[]
}
