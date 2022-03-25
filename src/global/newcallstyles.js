import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    container: {
      
      backgroundColor:'white',
      flex: 1,
     
    },
    profileContainer:{
      flexDirection:'row',
      paddingHorizontal:12,
      paddingVertical:10,
      justifyContent:'space-between'
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
      fontWeight:'bold',
      color:'green',
    },
    callHandle :{
      marginHorizontal:8,
      color:'blue'
    },
    callContentContainer : {
      marginTop:12,
      marginBottom:12,
      borderBottomWidth:10,
      borderBottomColor:'#e5e7eb'
    },
    callContent : {
      lineHeight:30,
      fontSize:20,
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
      backgroundColor:'#1d9bf1',
      right: 12,
      bottom: 20,
   },
   callEngagementLabel :{
    color:'gray',
    marginLeft: 6,

   },
   callEngagementNumber :{
     fontWeight:'bold'
  },
  
  });
