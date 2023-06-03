import axios from 'axios';
import { baseUrlApi } from '../../constants/base_urls'


//============ get All suggestion
export async function getAllSuggestion() {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    try {
        const response = await axios.get(`${baseUrlApi}user_connections`,
            {
                headers: {
                    authorization: `Bearer ${lsUser.token.access}`,
                    Accept: 'application/json',
                },
            })
        return response.data
    } catch (error) { }
}


//============ get All Connections
export async function getAllConnection(filter_by) {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    try {
        const response = await axios.get(`${baseUrlApi}user_connections?filter_by=${filter_by}&user_id=${lsUser.data.id}`,
            {
                headers: {
                    authorization: `Bearer ${lsUser.token.access}`,
                    Accept: 'application/json',
                },
            })
        return response.data
    } catch (error) { }
}





//============  create Connection

export const createConection = async (id) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    try {
        const response = await axios.post(`${baseUrlApi}user_connections/`, { request_for: "create_connection", user_id: id },
            {
                headers: {
                    authorization: `Bearer ${lsUser.token.access}`,
                    Accept: 'application/json',
                },
            })
        return response.data
    } catch (error) { }

}


// Actions of connection
export const actionConection = async (id, request_for) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    try {
        const response = await axios.post(`${baseUrlApi}user_connections/`, { request_for: request_for, record_id: id },
            {
                headers: {
                    authorization: `Bearer ${lsUser.token.access}`,
                    Accept: 'application/json',
                },
            })

        return response.data

    } catch (error) { }


}






