
import React from 'react';
import { useToast } from 'native-base';
const EmailCheckRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

toast = useToast();

export const ResponseToast = (position, buttonText, type, text, duration) =>
{
  return <>
    {()=>toast.show({
      buttonText:{buttonText},
      position :{position},
      text : { text },
      duration: { duration },
      type:{type} 
    })
    }
   </>
}

export const LoadingToast = (position,text,type)=>
{
  return <>
  
      {()=>toast.show({
      position :{position},
      text : { text },
      type:{type} 
    })
    }
  
  </>
}