
const baseUrl='http://localhost:5000';
// get all data
export const getData = async (url) => {
    const response = await fetch(`${baseUrl}/${url}`);
    return await response.json();
}
// get by id
export const getById = async (url) => {
    const response = await fetch(`${baseUrl}/${url}`);
    return response;
}
// create a new student
export const addData = async (url,jsonData) => {
    const response = await fetch(`${baseUrl}/${url}`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData)
    });
    return response;
}
// update an existing student
export const updateData = async (url,jsonData) => {
    const response = await fetch(`${baseUrl}/${url}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData)
    });
    return response;
}
//delete an existing student
export const deleteData = async (url) => {
    const response = await fetch(`${baseUrl}/${url}`,{
        method: "Delete",
    });
    return response;
}