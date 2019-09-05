import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import BookListScreen from './screens/BookListScreen';
import BookScreen from './screens/BookScreen';
import AddBookScreen from './screens/AddBookScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

const BookListStack = createStackNavigator({
  BookList: {
    screen: BookListScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#29749D'
      }
    }
  },
  Book: {
    screen: BookScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#29749D'
      },
      headerTintColor: 'white'
    }
  }
});

BookListStack.navigationOptions = {
  tabBarLabel: 'Hem'
};

const AddBookStack = createStackNavigator({
  AddBook: {
    screen: AddBookScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#29749D'
      }
    }
  }
});

AddBookStack.navigationOptions = {
  tabBarLabel: 'Lägg ut bok',
};

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#29749D'
      }
    }
  }
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Konto',
};

const LoginStackAdd = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#29749D'
      }
    }
  }
});

LoginStackAdd.navigationOptions = {
  tabBarLabel: 'Lägg ut bok',
};

const LoginStackProfile = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#29749D'
      }
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#29749D'
      },
      headerTintColor: 'white'
    }
  }
});

LoginStackProfile.navigationOptions = {
  tabBarLabel: 'Konto',
};

const AppStack = createBottomTabNavigator(
  {
    BookList: BookListStack,
    AddBook: AddBookStack,
    Profile: ProfileStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'BookList') {
          iconName = `home${focused ? '' : ''}`;
        } else if (routeName === 'AddBook') {
          iconName = `add${focused ? '' : ''}`;
        } else if (routeName === 'Profile') {
          iconName = `person${focused ? '' : ''}`;
        }

        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#f9fafa',
      activeBackgroundColor: '#29749D',
      inactiveTintColor: '#94bace',
      inactiveBackgroundColor: '#29749D'
    }
  }
);

const AuthStack = createBottomTabNavigator(
  {
    BookList: BookListStack,
    AddBook: LoginStackAdd,
    Profile: LoginStackProfile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'BookList') {
          iconName = `home${focused ? '' : ''}`;
        } else if (routeName === 'AddBook') {
          iconName = `add${focused ? '' : ''}`;
        } else if (routeName === 'Profile') {
          iconName = `person${focused ? '' : ''}`;
        }

        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#f9fafa',
      activeBackgroundColor: '#29749D',
      inactiveTintColor: '#94bace',
      inactiveBackgroundColor: '#29749D'
    }
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
