import { IUser } from "../types/types"

const BASE_URL = "https://jsonplaceholder.typicode.com/users"

export const fetchUserData = async (id: string): Promise<IUser | undefined> => {

    const response = await fetch(`${BASE_URL}/${id}`)
    const data = await response.json()
    return data
}