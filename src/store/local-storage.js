import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem(key, value) {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getItem(key) {
  const value = await AsyncStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}

export async function removeItem(key) {
  return AsyncStorage.removeItem(key);
}

export async function cleanStorage() {
  return AsyncStorage.clear();
}
