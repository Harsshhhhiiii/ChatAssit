import React, { useEffect } from 'react'

const Check = () => {
    useEffect(()=>{
        const x=async(req,res)=>{
            const res2=await fetch("http://localhost:3001")
            const data=await res2.json();
            console.log(data);
        }
        x();
    },[])
      return (
    <>
    <h1> UVYAEFWIJOPQDWO</h1>
   
    </>
  )
}

export default Check