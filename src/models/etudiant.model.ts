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

export const getById = (id: number): Etudiant | undefined => {
  return etudiants.find(e => e.id === id)
}

export const create = (nom: string, prenom: string, email: string): Etudiant => {
  const nouvelEtudiant: Etudiant = {
    id: nextId,
    nom,
    prenom,
    email
  }
  etudiants.push(nouvelEtudiant)
  nextId++
  return nouvelEtudiant
}