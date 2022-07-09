import './App.css';
import StudentList from "./components/students/StudentList";
import AddStudent from "./components/students/AddStudent";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import EditStudent from "./components/students/EditStudent";
import AddBook from "./components/books/AddBook";
import BookList from "./components/books/BooksList";
import EditBook from "./components/books/EditBook";
import Header from "./components/header/Header";


function App() {
    return (<>
        <Header />
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<BookList/>}/>
                <Route exact path="/addbook" element={<AddBook/>}/>
                <Route exact path="/editbook/:id" element={<EditBook/>}/>
                <Route exact path="/students" element={<StudentList/>}/>
                <Route exact path="/addstudent" element={<AddStudent/>}/>
                <Route exact path="/editstudent/:id" element={<EditStudent/>}/>
            </Routes>
        </BrowserRouter>
   </>);
}

export default App;
