import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

export const screens = {
  HomeTab: 'HomeTab',
  HomeStack: 'HomeStack',
  Home: 'Home',
  HomeDataStack: 'HomeDataStack',
  HomeData: 'HomeData',
  BookStack: 'BookStack',
  Book: 'Book',
  ContactStack: 'ContactStack',
  Contact: 'Contact',
  LogoutStack: 'LogoutStack',
  Logout: 'Logout',
  RegisterStack: 'RegisterStack',
  Register: 'Register',
  LoginStack: 'LoginStack',
  Login: 'Login',
  ForgotPasswordStack: 'ForgotPasswordStack',
  ForgotPassword: 'ForgotPassword',
  DashboardStack: 'DashboardStack',
  Dashboard: 'Dashboard',
}

export const routes = [
  {
    name: screens.HomeTab,
    focusedRoute: screens.HomeTab,
    title: 'Home',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.HomeStack,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Home,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },
   {
    name: screens.HomeDataStack,
    focusedRoute: screens.HomeDataStack,
    title: 'HomeData',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.HomeData,
    focusedRoute: screens.HomeDataStack,
    title: 'HomeData',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },

  {
    name: screens.BookStack,
    focusedRoute: screens.BookStack,
    title: 'Today',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="list" size={30} color={focused ? '#551E18' : '#000'} />,
  },

  {
    name: screens.Book,
    focusedRoute: screens.BookStack,
    title: 'Today',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="list" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.ContactStack,
    focusedRoute: screens.ContactStack,
    title: 'All',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="calendar" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Contact,
    focusedRoute: screens.ContactStack,
    title: 'All',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="calendar" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.LogoutStack,
    focusedRoute: screens.LogoutStack,
    title: 'Logout',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="map-marker" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Logout,
    focusedRoute: screens.LogoutStack,
    title: 'Logout',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="map-marker" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.RegisterStack,
    focusedRoute: screens.RegisterStack,
    title: 'Register',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="address-book-o" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Register,
    focusedRoute: screens.RegisterStack,
    title: 'Register',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="address-book-o" size={30} color={focused ? '#551E18' : '#000'} />,
  },
   {
    name: screens.DashboardStack,
    focusedRoute: screens.DashboardStack,
    title: 'Dashboard',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="sign-out" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Dashboard,
    focusedRoute: screens.DashboardStack,
    title: 'Dashboard',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="sign-out" size={30} color={focused ? '#551E18' : '#000'} />,
  },

  {
    name: screens.LoginStack,
    focusedRoute: screens.LoginStack,
    title: 'Login',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="sign-out" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Login,
    focusedRoute: screens.LoginStack,
    title: 'Login',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="sign-out" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.ForgotPasswordStack,
    focusedRoute: screens.ForgotPasswordStack,
    title: 'ForgotPassword',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="fa-key" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.ForgotPassword,
    focusedRoute: screens.ForgotPasswordStack,
    title: 'ForgotPassword',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="fa-key" size={30} color={focused ? '#551E18' : '#000'} />,
  },
 
]
