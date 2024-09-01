import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ApiServices } from './api/api_services';


const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const [mailId, setMailId] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const [open, setOpen] = useState(false);

    const [errorOpen, setErrorOpen] = useState(false)
    const [errMsg, setErrorMsg] = useState("")


    const handleClose = () => {
        setOpen(false);
        window.location.replace("/React-Todo-app/")
    };

    const handleErrorClose = () => {
        setErrorOpen(false)
    }

    const logIn = async (mailId, password) => {
        const data = {
            mailId: mailId,
            password: password
        }
        ApiServices.login(data).then((res) => {
            console.log(res)
            if (res.response_code === 200) {
                localStorage.setItem("token", res.token)
                localStorage.setItem("name", res.userName)
                setOpen(true)
            }
        }).catch((err) => {
            if (err) {
                setErrorOpen(true)
                setErrorMsg(err.data.message)
            }
        })
    }

    return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}  >
            <Card style={{ boxShadow: "2px 2px 3px 3px lightblue" }} className='shadow' sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography style={{ fontSize: "20px", textAlign: "center", padding: "10px", marginBottom: "2px" }} gutterBottom variant="h5" component="div">
                        LOGIN
                    </Typography>
                    <FormControl sx={{ width: '100%', marginBottom: "5%" }} variant="outlined">
                        <TextField
                            id="outlined-basic"
                            value={mailId}
                            onChange={(e) => setMailId(e.target.value)}
                            label="MailId"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl sx={{ width: '100%', marginBottom: "5%" }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button onClick={() => logIn(mailId, password)} style={{ width: "100%", borderRadius: "10px" }} variant="contained" size="large">
                        Login
                    </Button>
                    <Typography style={{ fontSize: "15px", textAlign: "center", marginTop: "2%" }} >
                        Don't have account? <span onClick={() => navigate("/React-Todo-app/signup")} style={{ cursor: "pointer" }} >Create account</span>
                    </Typography>

                </CardContent>
            </Card>


            <Dialog
                maxWidth="xs"
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ display: "flex", justifyContent: "center" }} id="alert-dialog-title">
                    {/* <CheckCircleTwoToneIcon style={{ fontSize: "80px", color: 'primary' }} /> */}
                </DialogTitle>
                <DialogContent style={{ display: "flex", justifyContent: "center" }} >
                    <DialogContentText fontSize={20} id="alert-dialog-description">
                        Login Success
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center" }} >
                    <Button variant="contained" size="large" onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                maxWidth="xs"
                fullWidth
                open={errorOpen}
                onClose={handleErrorClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ display: "flex", justifyContent: "center" }} id="alert-dialog-title">
                    {/* <CheckCircleTwoToneIcon style={{ fontSize: "80px", color: 'primary' }} /> */}
                </DialogTitle>
                <DialogContent style={{ display: "flex", justifyContent: "center" }} >
                    <DialogContentText fontSize={20} id="alert-dialog-description">
                        {errMsg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center" }} >
                    <Button variant="contained" size="large" onClick={handleErrorClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default Login