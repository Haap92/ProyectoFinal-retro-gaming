import { useFonts } from "expo-font";
import { fonts } from "./src/global/fonts";
import { Provider } from "react-redux";
import store from './src/store';
import MainNavigator from "./src/navigation/MainNavigator";
import { init } from "./src/db";

init()
  .then(()=> console.log("DB started"))
  .catch((error) => {
    console.log(error);
  })


export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
