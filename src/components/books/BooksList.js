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

const BookList = () => {
    const classes = useStyles();
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteBook=async (id) => {
        const res = await deleteData(`book/${id}`);
        if(res.status===200){
            setBooks(books.filter(book => book.id !== id));
        }
    }

    useEffect(() => {
        const getBooks = async () => {
            const data = await getData("books");
            if(data && data) {
                const data1=data.map(async book => {
                    if(book.student_id!=="") {
                        const student = await getData(`student/${book.student_id}`);
                        book.borrowed = student.first_name + " " + student.last_name;
                    }
                    book.date= book.date!=="" ? new Date(book.date).toLocaleDateString("en-US"):"";
                    book.return_date=book.return_date!=="" ? new Date(book.return_date).toLocaleDateString("en-US"):"";
                    return book;
                })
                Promise.all(data1).then((values) => {
                    setBooks(values)
                });
            }
        }
        getBooks();
    }, []);
    return (
        <Container maxWidth="lg" className={classes.textColor}>
            <Grid container className={classes.marginClass} direction="row" justifyContent="space-between">
                <Grid item xs={6} align="left">
                    <Typography variant="h6" className={classes.deliver} component="h2">
                        Book List
                    </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                    <Button variant="contained" color="primary" href={`/addbook`}>
                        <AddIcon /> Add New
                    </Button>
                </Grid>
            </Grid>
            <TableContainer>
                <Table className={classes.root} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.root}>
                            <TableCell>Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Borrowed by</TableCell>
                            <TableCell>Borrow Date</TableCell>
                            <TableCell>Return Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {books && books.length === 0 ?
                            <TableRow>
                                <TableCell align="center">No Book</TableCell>
                            </TableRow>
                            : books && books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book, key) =>
                                <TableRow key={key}>
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.borrowed}</TableCell>
                                    <TableCell>{book.date}</TableCell>
                                    <TableCell>{book.return_date}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" color="primary" href={`/editbook/${book.id}`}> <EditIcon/> </IconButton> |
                                        <IconButton aria-label="delete" color="secondary"  onClick={() => deleteBook(book.id)}> <DeleteIcon /> </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                books.length <= 10 ? <></> : <>
                    <TablePagination
                        //sx={{pl:0,mr:21}}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={books.length}
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
export default BookList;