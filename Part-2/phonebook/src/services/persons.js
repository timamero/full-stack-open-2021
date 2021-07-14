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

const update = (objId, object) => {
    return axios.put(`${baseUrl}/${objId}`, object)
}

const personsServices = { getAll, create, deleteObj, update }
export default personsServices;