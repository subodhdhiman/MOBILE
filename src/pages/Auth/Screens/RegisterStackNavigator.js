import React, {useContext, useEffect, useState,useCallback} from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Alert, ActivityIndicator, Image, TextInput,ScrollView, TouchableOpacity }
  from 'react-native';
import { styles } from './registerstyles';
import { useDispatch, useSelector } from 'react-redux';
import { register, setDataStateRegister } from '../../Auth/Service';
import { setStorageValue, getStorageValue } from '../../../common/storeDataValue'
import { cleanUpData,
  instantiateAbort,ResponseToast,LoadingToast } from '../../../helpers/componentHelperFunc';
import { Formik, } from 'formik';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';

// For Navigation
import { screens } from '../../../navigation/RouteItems'
const Stack = createStackNavigator()

function Register({ navigation}) {
 
 const abortEffect = instantiateAbort();
  const dispatch = useDispatch();   
 
  const registerResponse = useSelector(state => {
  //  console.log('registerResponse::::::::: ', state.authReducer);
    return state.authReducer.dataStateRegister;
  });
  
  function removeToken() {
  return new Promise(function(resolve)
 {
  AsyncStorage.removeItem('token');
  resolve(true);
  });
}
  
   
  useEffect(() => {

    const timer = setTimeout(() => {
    console.log('Registerd Get Effect Called');
    if(registerResponse!="" || registerResponse=="REGISTER_LOADING" )
    {
      LoadingToast("top","please wait..","success");
    }
    if (registerResponse === "REGISTER_SUCCESS" ) {
   //   LoadingToast("top", "User Registered, Login Please", "success");
      Alert.alert("Success", "User Registered, Login Please")
      navigation.navigate("LoginStack");
    }
    if(registerResponse === "REGISTER_ERROR")
    {
          if(typeof registerResponse === "string")
          {
            ResponseToast("top","Close","danger",registerResponse,6000);
            
          }else if(typeof registerResponse === "object")
          {
            Object.keys(registerResponse).map((keys,index)=>{
        
              ResponseToast("top","Close","danger",registerResponse[keys][0],6000);
            })
          }
      }

       }, 1000);
    
    return () => {
      clearTimeout(timer)
      cleanUpData(abortEffect)
    }
    }, [registerResponse])


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>


      <Formik
          initialValues={{
          email: '',         
          username: '',
          firstname: '',
          lastname: '',
          nickname: '',
          mobile1: '',
          mobile2: '',
          mobile3: '',
          password: '',
          password_confirmation:'',

          // email: 'vikaslakhera1970@gmail.com',         
          // username: 'vikass',
          // firstname: 'deep',
          // lastname: 'dee',
          // nickname: 'nicky',
          // mobile1: '98776556765',
          // mobile2: '56556656566',
          // mobile3: '56556555666',
          // password: 'Vikas@123',
          // password_confirmation:'Vikas@123',

            }}
            onSubmit={(values, onSubmitProps) => {
            //  console.log('onSubmit :', onSubmitProps)
             // onSubmitProps.setSubmitting(false)
              onSubmitProps.setSubmitting(true);
              
              dispatch(setDataStateRegister("REGISTER_LOADING"))
              dispatch(register(values))
            //  onSubmitProps.resetForm()
              onSubmitProps.setSubmitting(false);

            }
            }
            validationSchema={yup.object().shape({
            username: yup.string()
                  .required("User Name is Required.")
                  .min(2, "User Name is Too Short."),
            firstname: yup.string()
                  .required("First Name is Required.")
                  .min(2, "First Name is Too Short."),
            lastname: yup.string()
                  .required("Last Name is Required.")
                .min(1, "Last Name is Too Short."),
            nickname: yup.string() 
                  .min(1, "Last Name is Too Short."),
            email: yup.string()
                .required('Please enter your email address')
                .label('Email')
                .email('Enter a valid email'), 
         mobile1: yup.string()
            .required("This field is Required")
            .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
              ),
         mobile2: yup.string()  
            .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
              ),
          mobile3: yup.string()  
            .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
          ),
          password: yup.string()
         .required("Please Enter your password")
      .min(5, "Your password must be longer than 5 characters.")
      .max(25)
      .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        "Must Contain One Uppercase, One Lowercase"
         )
      .matches(
        /^(?=.*[!@#\$%\^&\*])/,
        "Must Contain One Special Case Character"
        )
            .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
        
        password_confirmation: yup.string()
              .label('Password Confirm')
              .required()
              .oneOf([yup.ref('password')], 'Passwords does not match'),
        })}
       >
        {({ values, handleChange, errors, handleBlur, touched, isValid, isSubmitting, handleSubmit, handleReset }) => (
  
            <>  
              <View style={styles.flexRow}> 
          <TextInput
              name="username"
              placeholder="Username"  
              style={[styles.inputBox, styles.mtText]}
                onChangeText={handleChange('username')}
                
              onBlur={handleBlur('username')}
              value={values.username}
              
            />
           
           {values.username.length > 0 ?
                    errors.username ?
                      <Ionicons name="checkmark" size={30} color="gray" style={{ marginTop: 23 }} />
                      : <Ionicons name="ios-checkmark-circle-outline" size={30} color="green" style={{ marginTop: 23 }} />
                    : null
                }
                </View> 
                  {(errors.username && touched.username) &&
                  <Text style={styles.errorText}>{errors.username}</Text>
                }
            <View style={styles.flexRow}>      
          <TextInput
              name="firstname"
              placeholder="Firstname"  
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('firstname')}
              onBlur={handleBlur('firstname')}
              value={values.firstname}
              
                />
                  {values.firstname.length > 0 ?
                    errors.firstname ?
                      <Ionicons name="checkmark" size={30} color="gray" style={{ marginTop: 23 }} />
                      : <Ionicons name="ios-checkmark-circle-outline" size={30} color="green" style={{ marginTop: 23 }} />
                    : null
                }
                </View>
             {(errors.firstname && touched.firstname) &&
                  <Text style={styles.errorText}>{errors.firstname}</Text>
                }
            <TextInput
              name="lastname"
              placeholder="Lastname"  
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('lastname')}
              onBlur={handleBlur('lastname')}
              value={values.lastname}
              
            />
             {(errors.lastname && touched.lastname) &&
                  <Text style={styles.errorText}>{errors.lastname}</Text>
                }
                
                <TextInput
              name="nickname"
              placeholder="Nick Name"  
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('nickname')}
              onBlur={handleBlur('nickname')}
              value={values.nickname}
              
            />
             {(errors.nickname && touched.nickname) &&
                  <Text style={styles.errorText}>{errors.nickname}</Text>
                }
            <View style={styles.flexRow}>     
            <TextInput
              name="email"
              placeholder="Email"  
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              
              />
                {values.email.length > 0 ?
                    errors.email ?
                      <Ionicons name="checkmark" size={30} color="gray" style={{ marginTop: 23 }} />
                      : <Ionicons name="ios-checkmark-circle-outline" size={30} color="green" style={{ marginTop: 23 }} />
                    : null
                }
                </View>
             {(errors.email && touched.email) &&
                  <Text style={styles.errorText}>{errors.email}</Text>
                }
                
          <TextInput
              name="mobile1"
              placeholder="Mobile 1"  
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('mobile1')}
              onBlur={handleBlur('mobile1')}
              value={values.mobile1}
              
                />
                
             {(errors.mobile1 && touched.mobile1) &&
                  <Text style={styles.errorText}>{errors.mobile1}</Text>
              }

          <TextInput
              name="mobile2"
              placeholder="Mobile 2"  
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('mobile2')}
              onBlur={handleBlur('mobile2')}
              value={values.mobile2}
              
            />
             {(errors.mobile2 && touched.mobile2) &&
                  <Text style={styles.errorText}>{errors.mobile2}</Text>
              }       

            <TextInput
              name="mobile3"
              placeholder="Mobile 3"  
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('mobile3')}
              onBlur={handleBlur('mobile3')}
              value={values.mobile3}
              
            />
             {(errors.mobile3 && touched.mobile3) &&
                  <Text style={styles.errorText}>{errors.mobile3}</Text>
              }   

            <TextInput
              name="password"
              placeholder="Password"      
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('password')}
              onBlur={handleBlur("password")}
              secureTextEntry={true}
              value={values.password} 
              />
            {(errors.password && touched.password) &&
                <Text style={styles.errorText}>{errors.password}</Text>
              }
              
              
            <TextInput
              name="password_confirmation"
              placeholder="Confirm Password"  
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('password_confirmation')}
                onBlur={handleBlur('password_confirmation')}
                secureTextEntry={true}
              value={values.password_confirmation}
              
            />
             {(errors.password_confirmation && touched.password_confirmation) &&
                  <Text style={styles.errorText}>{errors.password_confirmation}</Text>
                }
            
          <TouchableOpacity
              style={[styles.registerButton,styles.mtButton,
                  { shadowColor: "red",
                    backgroundColor :   isValid? "#900C3F": "gray" 
                   
                  }
                  ]}
                    disabled={! isValid || isSubmitting}
                  onPress={handleSubmit}
              >
                  {registerResponse == 'REGISTER_LOADING'  && (
            <ActivityIndicator
              style={{marginRight: 18}}
              size="large"
              color="white"
            />
          )}
              <Text style={styles.registerButtonText}>
                Register
             </Text>
        </TouchableOpacity>
            <View style={styles.register}>
            <Text> Already have an  account?  </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('LoginStack')} 
            >
              <Text style={styles.loginTextLink}>
              Login
            </Text>
          </TouchableOpacity>
         </View>

          </>  

        )}
      </Formik>
      
      </ScrollView>
    </View>
 
);
} 
    

const  RegisterStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Register} component={Register} />
    </Stack.Navigator>
  )
}

export default RegisterStackNavigator




