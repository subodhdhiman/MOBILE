
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageValue = async (value) => {
    //        console.log('Into Set Storage Value function');
      try {
        
        await AsyncStorage.setItem('token', value);

      } catch (e) {
        
        console.log('Redux : setStorageValue  exception', e);
        return null;
    // saving error
  }
}

export const getStorageValue = async () => {

   try {
    const value = await AsyncStorage.getItem('token')

     if (value !== null) {
       console.log('Redux : getStorageValue GET :', value);
      return value;
     } else {    
       console.log('Storing token  data value not found  function :' )
       return null;
    }
  } catch(e) {
     console.log('getStorageValue Exception Error No Token from local ');
  }
}

