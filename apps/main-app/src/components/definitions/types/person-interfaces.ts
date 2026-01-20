"use client"

export interface PersonData{
    id: string;
    name: string;
    job: string;
    color: string;
}

export interface PersonListState{
    list: PersonData[],
    addPerson: (newperson: Omit<PersonData, "id">) => void;
    removePerson: (id: string) => void;
    removeAll: () => void;
}