import { View, useColorScheme } from 'react-native';

// This is a shim for web and Android where the tab bar is generally opaque.
export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  //const backgroundColor = colorScheme === 'dark' ? '#181c24' : 'red';
  const backgroundColor = colorScheme === 'dark' ? 'blue' : 'red';
  return <View style={{ flex: 1, backgroundColor }} />;
}

export function useBottomTabOverflow() {
  return 0;
}
export function useTabBarHeight() {
  return 0;
}