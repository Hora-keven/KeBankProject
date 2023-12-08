import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'



import Home from './pages/Home'
import PhysicalOrJuridic from './pages/Home/phyperOrJuriPer'
import Physical from './pages/Login/Signup/Physical';
import LoginUser from './pages/Login/signin'

import FirstScreen from './pages/HomeFunc/index.js'
import ScreenPix from './pages/Pix'
import ScreenExtract from './pages/Extract'
import ScreenLoan from './pages/Loan/index'
import ScreenCards from './pages/Mycards'

import ApiProvider from './context/APicontext.jsx';
import Juridic from './pages/Login/Signup/Juridic';


const stack = createStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <ApiProvider>


        <stack.Navigator>
        <stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <stack.Screen name='Loan' component={ScreenLoan} options={{ headerShown: false }} />
       
          <stack.Screen name='First' component={FirstScreen} options={{ headerShown: false }} />
          <stack.Screen name='ScreenCard' component={ScreenCards} options={{ headerShown: true }} />
      
          <stack.Screen name='ScreenExtract' component={ScreenExtract} options={{ headerShown: false }} />
          <stack.Screen name='ScreenPix' component={ScreenPix} options={{ headerShown: false }} />
          <stack.Screen name='Login_User' component={LoginUser} options={{ headerShown: false }} />
        
          <stack.Screen name='PhysicalOrJuridic' component={PhysicalOrJuridic} options={{ headerShown: false }} />
          <stack.Screen name='Physical' component={Physical} options={{ headerShown: false }} />
          <stack.Screen name='Juridic' component={Juridic} options={{ headerShown: false }} />
        </stack.Navigator>
      </ApiProvider>
    </NavigationContainer>
  );
}

