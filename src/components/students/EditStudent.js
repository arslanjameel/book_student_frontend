import {useEffect, useState} from "react";
import {getById, updateData} from "../apis/apisFunctions";
import {Button, Container, Grid, TextField} from "@material-ui/core";
import {useNavigate, useParams} from "react-router-dom";

const EditStudent = () => {
    const { id } = useParams();
    useEffect(() => {
        const getStudent = async () => {
            const res = await getById(`student/${id}`);
            if(res.status ===200){
                const data = await res.json();
                setFName(data.first_name);
                setLName(data.last_name);
            }
        }
        getStudent();
    }, [id]);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    let navigate = useNavigate();
    const updateStudent = async (e) => {
        e.preventDefault();
        const jsonData = {
            id:id,
            first_name: fName,
            last_name: lName,
        }
        const res = await updateData(`student/${id}`, jsonData);
        if(res.status===200){
            navigate('/students');
        }
        //console.log('res=', data);
    }

    return (<>
        <Container maxWidth="md">
            <h1>Update Student</h1>
            <Grid container direction="row" spacing={1} justifyContent="flex-start">
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" fullWidth label="First Name" value={fName}
                               onChange={(e) => setFName(e.target.value)} variant="outlined"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" fullWidth label="Last Name" value={lName}
                               onChange={e => setLName(e.target.value)} variant="outlined"/>
                </Grid>
            </Grid>
            <div style={{marginTop:'1rem'}}>
                <Button variant="contained" color="primary" onClick={(e) => updateStudent(e)}>
                    Update
                </Button>
            </div>

        </Container>
    </>)
}
export default EditStudent