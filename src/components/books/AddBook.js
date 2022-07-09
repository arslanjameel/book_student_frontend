import {useEffect, useState} from "react";
import {addData, getData} from "../apis/apisFunctions";
import {Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width:'100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const AddBook = () => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [return_date, setReturn_date] = useState("");
    const [student_id, setStudent_id] = useState("");

    const classes = useStyles();
    let navigate = useNavigate();
    const handleChange = (event) => {
        setStudent_id(event.target.value);
    };
    console.log('borrowed=',student_id)
    useEffect(() => {
        const getStudents = async () => {
            const data = await getData("students");
            setStudents(data);
        }
        getStudents();
    }, []);
    const addBook = async (e) => {
        e.preventDefault();
        const jsonData = {
            name: name,
            author: author,
            date:date,
            return_date:return_date,
            student_id: student_id,
        }
        const res = await addData("book", jsonData);
        if(res.status===200){
            navigate('/');
        }
        //console.log('res=', data);
    }
    return (<>
        <Container maxWidth="lg">
            <h1>Add/Assign Book</h1>
            <Grid container direction="row" spacing={1} justifyContent="flex-start">
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" fullWidth label="Book Name" value={name}
                               onChange={(e) => setName(e.target.value)} variant="outlined"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" fullWidth label="Author" value={author}
                               onChange={e => setAuthor(e.target.value)} variant="outlined"/>
                </Grid>
                {/*<Grid item xs={12} md={6}>*/}
                {/*    <TextField id="outlined-basic" fullWidth label="Borrowed Student" value={borrowed}*/}
                {/*               onChange={(e) => setBorrowed(e.target.value)} variant="outlined"/>*/}
                {/*</Grid>*/}
                <Grid item xs={12} md={6}>
                    <TextField id="date" label="Date of Borrow" value={date} fullWidth type="date" variant="outlined"
                        InputLabelProps={{shrink: true,}} onChange={e => setDate(e.target.value)}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="date" label="Return Date" value={return_date} fullWidth type="date" variant="outlined"
                               InputLabelProps={{shrink: true,}} onChange={e => setReturn_date(e.target.value)}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Student</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={student_id}
                            onChange={handleChange}
                            label="Student"
                        >
                            <MenuItem value="" selected><em>None</em></MenuItem>
                            {students && students.map((student,index) => (
                                <MenuItem key={index} value={student.id}> {student.first_name} {student.last_name} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <div style={{marginTop:'1rem'}}>
                <Button variant="contained" color="primary" onClick={(e) => addBook(e)}>
                    Create
                </Button>
            </div>

        </Container>
    </>)
}
export default AddBook