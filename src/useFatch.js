import { useEffect, useState } from 'react';

const useFatch = (url) => {
 const[data,setdata] = useState(null);

 useEffect(()=>{
    const abortcont = new AbortController();
    fetch(url,{signal:abortcont.signal}).then(res=>{
        return res.json();
    }).then(result=>{
        setTimeout(()=>{
            setdata(result);
        },20);
    })
    return()=>abortcont.abort();
},[url])
return {data}
}

export default useFatch;