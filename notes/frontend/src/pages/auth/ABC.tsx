import { api } from '@/services/api/api'
import axios from 'axios'
import React, { useEffect } from 'react'

function ABC() {
    useEffect(()=>{
        async function abcc(){
            const data = await api.get('/auth')
            console.log("data", data)
        }
        abcc();
    }, [])
  return (
    <div>ABC</div>
  )
}

export default ABC