import React, {useEffect} from 'react'
import './App.css'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/login/Login";
import {Routes, Route, Navigate} from 'react-router-dom'
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {logOutTC, meTC} from "../features/login/authReducer";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';


function App() {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    useEffect(() => {
        console.log('1')
        dispatch(meTC());
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUNDS</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

//1, 2, 3

export default App
