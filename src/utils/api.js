import axios from "axios";


export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_API_URL + url)
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const postData = async (url, formData) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to post data');
            // return errorData;
        }

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}


export const editData = async (url, updatedData) => {
    try {
        const { res } = await axios.put(`${process.env.REACT_APP_API_URL}${url}`, updatedData)
        return res;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

export const deleteData = async (url) => {
    const { res } = await axios.delete(`${process.env.REACT_APP_API_URL}${url}`)
    return res;
}


// export const uploadImage = async (url, formData) => {
//     try {
//         const { res } = await axios.post(process.env.REACT_APP_API_URL + url, formData);
//         return res;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

// const result = await axios.post("http://localhost:4000/api/uploadImage", { image });
export const uploadImage = async (url, { image }) => {
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + url, { image });
        return response.data;
    }
    catch (error) {
        console.error('Error uploading image:', error);
        return error.response ? error.response.data : { error: 'Something went wrong' };
    }
};

export const deleteImages = async (url, image) => {
    try {
        const { res } = await axios.delete(`${process.env.REACT_APP_API_URL}${url}`, image);
        return res;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
}