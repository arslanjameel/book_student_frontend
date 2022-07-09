import {useEffect, useState} from "react";
import {deleteData, getData} from "../apis/apisFunctions";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Button, Container, Grid, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    root: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#1976d2"
        },
        "& .MuiTableCell-body": {
            color: "black",
            //border: 'none',
        },
    },
    textColor: {
        color: "gray"
    },
    deliver: {
        color: "black"
    },
    marginClass:{
        margin:"1rem 0"
    }
});

const StudentList = () => {
    const classes = useStyles();
    const [students, setStudents] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteStudent=async (id) => {
        const res = await deleteData(`student/${id}`);
        if(res.status===200){
            setStudents(students.filter(student => student.id !== id));
        }
    }

    useEffect(() => {
        const getStudents = async () => {
            const data = await getData("students");
            setStudents(data);
        }
        getStudents();
    }, []);
    return (
        <Container maxWidth="lg" className={classes.textColor}>
            <Grid container className={classes.marginClass} direction="row" justifyContent="space-between">
                <Grid item xs={6} align="left">
                    <Typography variant="h6" className={classes.deliver} component="h2">
                        Student List
                    </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                    <Button variant="contained" color="primary" href={`/addstudent`}>
                       <AddIcon /> Add New
                    </Button>
                </Grid>
            </Grid>
            <TableContainer>
                <Table className={classes.root} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.root}>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {students && students.length === 0 ?
                            <TableRow>
                                <TableCell align="center">No Student</TableCell>
                            </TableRow>
                            : students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student, key) =>
                                <TableRow key={key}>
                                    <TableCell>{student.first_name}</TableCell>
                                    <TableCell>{student.last_name}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" color="primary" href={`/editstudent/${student.id}`}> <EditIcon/> </IconButton> |
                                        <IconButton aria-label="delete" color="secondary"  onClick={() => deleteStudent(student.id)}> <DeleteIcon /> </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                students.length <= 10 ? <></> : <>
                    <TablePagination
                        //sx={{pl:0,mr:21}}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={students.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            }
        </Container>

    )
}
export default StudentList;