import {useEffect, useState} from "react";
import {getById, getData, updateData} from "../apis/apisFunctions";
import {Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {useNavigate, useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width:'100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const EditBook = () => {
    const { id } = useParams();
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [return_date, setReturn_date] = useState("");
    const [student_id, setStudent_id] = useState("");
    let navigate = useNavigate();
    const classes = useStyles();

    const handleChange = (event) => {
        setStudent_id(event.target.value);
    };
    useEffect(() => {
        const getBook = async () => {
            const res = await getById(`book/${id}`);
            if(res.status ===200){
                const data = await res.json();
                setName(data.name);setAuthor(data.author);setDate(data.date);setReturn_date(data.return_date);
                setStudent_id(data.student_id);
            }
            const studentData=await getData('students');
            setStudents(studentData);
        }
        getBook();
    }, [id]);

    const updateBook = async (e) => {
        e.preventDefault();
        const jsonData = {
            id:id,
            name: name,
            author: author,
            date: date,
            return_date: return_date,
            student_id: student_id,
        }
        const res = await updateData(`book/${id}`, jsonData);
        if(res.status===200){
            navigate('/');
        }
        //console.log('res=', data);
    }
    return (<>
        <Container maxWidth="md">
            <h1>Update Book</h1>
            <Grid container direction="row" spacing={1} justifyContent="flex-start">
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" fullWidth label="Book Name" value={name}
                               onChange={(e) => setName(e.target.value)} variant="outlined"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" fullWidth label="Author" value={author}
                               onChange={e => setAuthor(e.target.value)} variant="outlined"/>
                </Grid>
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
                            <MenuItem value=""><em>None</em></MenuItem>
                            {students && students.map((student,index) => (
                                <MenuItem key={index} value={student.id} selected={student.id===student_id}> {student.first_name} {student.last_name} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <div style={{marginTop:'1rem'}}>
                <Button variant="contained" color="primary" onClick={(e) => updateBook(e)}>
                    Update
                </Button>
            </div>

        </Container>
    </>)
}
export default EditBook