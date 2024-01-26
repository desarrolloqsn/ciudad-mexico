import React, { useEffect } from 'react'
import gif from './../../imagenes/Features-of-Big-data-analytics.gif'

export default function Loading(time) {

    const [showGraph, setShowGraph] = useState(false);
    const [displayGrafo, setdisplayGrafo] = useState('none');
    
    useEffect(()=>{
        setTimeout(() => {
            setShowGraph(true);
            setdisplayGrafo('')
      
          }, time);
    },[])

  return (
    <div>
      <img src={gif} style={{ display: showGraph ? 'none' : '' }} className='gitloading'/>
    </div>
  )
}
