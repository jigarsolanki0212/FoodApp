import {LogBox} from 'react-native';

if (__DEV__) {
  const ignoreWarns = [
    'If you want to use Reanimated 2',
    'ViewPropTypes will be removed from React Native',
    'Require cycle',
    'Virtualize',
    'Cannot update a component (`Checkout`) while rendering a different component (`CellRenderer`). To locate the bad setState() call inside `CellRenderer`',
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}
