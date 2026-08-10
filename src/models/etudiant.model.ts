export interface Etudiant {
  id: number
  nom: string
  prenom: string
  email: string
}

let etudiants: Etudiant[] = [
  { id: 1, nom: 'MacTavish', prenom: 'John', email: 'callmesoap.dupont@mail.com' },
  { id: 2, nom: 'Price', prenom: 'John', email: 'itsprice.martin@mail.com' }
]

let nextId = 3

export const getAll = (): Etudiant[] => {
  return etudiants
}