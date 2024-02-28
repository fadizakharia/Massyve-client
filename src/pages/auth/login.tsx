import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/authSlice';
import axios from '@/api'
import { useRouter } from 'next/navigation';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import Image from 'next/image'
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_MAIN_API_URL);
      
      const response = await axios.post('v1/auth/login', { username, password });
      const token = response.data.token;
      console.log(token);
      
      dispatch(setToken(token));
      localStorage.setItem('token', token);
      router.replace('/');
    } catch (error:any) {
      setError(error.response.data.message);
    }
  };

  return (
    <Box sx={{margin:"20vh auto",border:"1px black solid",display:"flex",flexDirection:'column',width:"50%",padding:"10px",boxShadow:"1px 1px 5px black"}}>
      <Box sx={(theme)=>({backgroundColor:theme.palette.primary.main,width:"fit-content",height:"fit-content",borderRadius:"100%",alignSelf:"center"})}>
      <Image src="/images/massyve.svg" alt="Logo" width={150} height={150}/>
      </Box>
      <Typography variant="h6" sx={{marginTop:"15px",alignSelf:"center"}}>Login</Typography>
      <Box sx={{height:"2px",backgroundColor:"black",opacity:0.25,marginTop:"10px",marginBottom:"25px"}}/>
      <TextField sx={{marginTop:"15px"}} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <TextField sx={{marginTop:"15px"}} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      {error && <Typography sx={{color:"red"}}>{error}</Typography>}
      <Button sx={{marginTop:"15px",color:"white"}} variant='contained' onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;