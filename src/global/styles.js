import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    container: {
      backgroundColor:'white',
      flex: 1,
    },
    callContainer:{
      flexDirection:'row',
      paddingHorizontal:12,
      paddingVertical:12,
      marginVertical:80
      
    },
    avatar:{
      width:42,
      height:42,
      borderRadius:21,
      marginRight:8,
    },
    flexRow: {
      flexDirection:'row'
    },
    callName : {   
      fontWeight:'700',
      color:'',
  },
      callPhoneNo : {   
      fontWeight:'900',
      color:'blue',
      
  },

    callTime :{
      marginHorizontal: 8,
      paddingLeft: 10,
      color: '#9e6b11',
      fontWeight:"bold"
    },
    callContentContainer : {
      marginTop:4,
    },
    callContent : {
      lineHeight: 20,
      color:"black"
  },
     iconImage : {
       flex: 1,
       alignContent:'space-between'
    },
    textGray: {color:'gray'},

    callEngagement :{
      flexDirection:'row',
      marginTop:2,
      alignItems: 'center',
    },
    ml : {
      marginLeft :16,
    },
    mt : {
      marginTop :10,
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
      backgroundColor:'#90013F',
      right: 12,
      bottom: 20,
   },
  });
