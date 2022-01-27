import axios from 'axios';

const baseURL = 'https://localhost:5001'

// export const GET = url => {
//     return axios.get(`${baseURL}/${url}`);
// }

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

const initialState = {
    loggedInUser: null,
};


export const actionCreators = {
    GET: (url) => async (dispatch, getState) => {
        return axios.get(`${baseURL}/${url}`);
    },
    
    POST: (url, data) => async (dispatch, getState) => {
        console.log(JSON.stringify(data));
        await axios(`${baseURL}/${url}`, {
            method: 'POST',
            headers,
            data
        }).then(response => {
            console.log(response)
            if(response.status === 200)
            {
                return true;
            } else {
                return false;
            }
        });
    },
    
    DELETE: (url, data) => async (dispatch, getState) => {
        await axios(`${baseURL}/${url}`, {
            method: 'DELETE',
            headers,
            data
        }).then(response => {
            if(response.status === 200)
            {
                return true;
            } else {
                return false;
            }
        })
    }
}

export const reducer = (state, action) => {
    state = state || initialState;

    return state;
}