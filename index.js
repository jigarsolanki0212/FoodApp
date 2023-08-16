/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {CustomTextCheckbox, CustomeTopView} from './src/views/components/text';
import customeView from './src/MockData/CustomView';
import CustomView from './src/MockData/CustomView';
import FavouriteScreen from './src/views/screen/FavouriteScreen/FavouriteScreen';

AppRegistry.registerComponent(appName, () => App);
