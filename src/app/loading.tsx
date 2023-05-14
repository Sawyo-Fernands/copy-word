
"use client"

import ReactLoading from 'react-loading';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading(){
    return (
        <div style={{
            height:"100vh",width:"100%",
            display:"flex",alignItems:"center",
            justifyContent:'center',backgroundColor:'white',
            zIndex:'999999999999999'
            }}>
                <div style={{
            height:"100vh",width:"100%",
            display:"flex",alignItems:"center",
            justifyContent:'center',backgroundColor:'white',
            zIndex:'999999999999999'
            }}>
                <CircularProgress sx={{fontSize:"30px"}} />
                </div>
        </div>
    )
}