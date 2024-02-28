import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '@/api/index';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { clearToken } from '../redux/authSlice';
export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {token} = useSelector<RootState, RootState["auth"]>((state) => state.auth);
  const [user,setUser] = useState({firstName: '', lastName: '',username: ''});
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get('/v1/user/', {
            headers: { Authorization: `bearer ${token}` },
          });
          setUser(response.data.user);
      
      } catch (error) {
        console.log(error);
        
      }
    };
    
    if(localStorage.getItem('token') || token){
      fetchData();
    }else{
      router.push('/auth/login');
    }
  }, [token,dispatch,router]);


  return (
    <Box sx={{marginTop:"74px"}}>
      <Typography>{`${user.firstName} ${user.lastName} is currently logged in`}</Typography>
    </Box>
  );
}
