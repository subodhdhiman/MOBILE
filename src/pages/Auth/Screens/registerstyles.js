import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      backgroundColor:'rgb(188, 0, 57, .1)',
     flex: 1,
      alignItems:"center",
       paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'rgb(188, 0, 57, .1)',

  },

      ml : {
      marginLeft :16,
  },
      
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
    errorText: {
        color: 'red'
    },
    mt : {
      marginTop: 5,

  },
     mtImage : {
      marginTop: 50,
      width: 260
  },
     mtText: {
      marginTop: 10,
      width: 260
  },
 
  registerButtonText: {
    color:"white",
  },
  registerButton: {
 
      flexDirection:"row",
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#900C3F',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
       paddingRight:25,
      bottom: 20,
  },
   mtButton: {
       marginTop:40,
  },
  registerText: {
     color:"white"
   },
  loginTextLink: {
   
    color:"blue",
    textDecorationLine:"underline"
  },
  register: {
      fontWeight:34,
      flexDirection:"row",
      alignItems: 'center',
      justifyContent: 'center',
  },
  
  inputBox: {
    backgroundColor:'white',
    padding: 6,
    borderRadius:4,
    },
    flexRow: {
      flexDirection:'row'
   },
    ml : {
      marginLeft :16,
    },
    mt : {
      marginTop: 130,
      width: 260
    },
    messageSeparator : {
      borderBottomColor:'gray',
      borderBottomWidth:1,
    },
    floatingButton: {
      //Here is the trick
      position: 'absolute',
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      position:'absolute',
      backgroundColor:'#1d9bf1',
      right: 12,
      bottom: 20,
   },
  });
