import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deleteObj = objId => {
    return axios.delete(`${baseUrl}/${objId}`)
}

const personsServices = { getAll, create, deleteObj }
export default personsServices;