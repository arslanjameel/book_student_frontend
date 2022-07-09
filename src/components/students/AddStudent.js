import {useState} from "react";
import {addData} from "../apis/apisFunctions";
import {Button, Container, Grid, TextField} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

const AddStudent = () => {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    let navigate = useNavigate();
    const addStudent = async (e) => {
        e.preventDefault();
        const jsonData = {
            first_name: fName,
            last_name: lName,
        }
        const res = await addData("student", jsonData);
        if(res.status===200){
            navigate('/students');
        }
        //console.log('res=', data);
    }
    return (<>
        <Container maxWidth="md">
            <h1>Add Student</h1>
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
                <Button variant="contained" color="primary" onClick={(e) => addStudent(e)}>
                    Create
                </Button>
            </div>

        </Container>
    </>)
}
export default AddStudent