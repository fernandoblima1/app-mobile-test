import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cards from '../../pages/Wallet';
import Pdf from '../../pages/PdfReader';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Cards" component={Cards} />
      <Tab.Screen name="Pdf" component={Pdf} />
    </Tab.Navigator>
  );
}

export default MyTabs;
