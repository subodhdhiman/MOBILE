import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      backgroundColor:'rgb(188, 0, 57, .1)',
    flex: 1,
      alignItems:"center"
  },
  errorText: {
        color: 'red'
    },
    callContainer:{
      flexDirection:'row',
      paddingHorizontal:12,
      paddingVertical:12,
      marginVertical:80
      
    },
    logo:{
      width:42,
      height:42,
      borderRadius:21,
      marginRight:8,
    },
      ml : {
      marginLeft :16,
    },
 
     mtText: {
      marginTop: 15,
      width: 210
  },
 
  loginButtonText: {
    color:"white",
  },
  loginButton: {
 
      flexDirection:"row",
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor:'#900C3F',
      padding: 12,
      bottom: 20,
  },
   mtButton: {
       marginTop:42,
  },
  registerText: {
     color:"white"
   },
  registerTextLink: {
   
    color:"blue",
    textDecorationLine:"underline"
  },
  register: {
    
      flexDirection:"row",
      marginTop: 12,
      alignItems: 'center',
    justifyContent: 'center',
      color:'blue'
  },
  forgetpassword: {
        flexDirection:"row",
      marginTop: 2,
      alignItems: 'center',
    justifyContent: 'center',
      marginRight:88
},
  
       inputBox: {
    backgroundColor:'white',
    padding: 10,
    borderRadius:4,
    },
    flexRow: {
      flexDirection:'row'
   },

    callName : {   
      fontWeight:'bold',
      color:'green',
    },
    callHandle :{
      marginHorizontal:8,
      color:'blue'
    },
    callContentContainer : {
      marginTop:4,
    },
    callContent : {
      lineHeight:20,
    },
    textGray: {color:'gray'},

    callEngagement :{
      flexDirection:'row',
      marginTop:6,
      alignItems: 'center',
    },
    ml : {
      marginLeft :16,
    },
    mt : {
      marginTop: 130,
      width: 260
    },
    callSeparator : {
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
