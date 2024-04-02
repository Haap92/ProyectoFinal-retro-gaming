import { View } from "react-native";
import Categories from "../components/Categories";
import { commonStyles } from '../global/commonStyles';

function Home({ navigation }) {
  return (
    <View style={commonStyles.headerContainer}>
      <View style={commonStyles.container}>
        <Categories navigation={navigation} />
      </View>
    </View>
  );
}

export default Home;
