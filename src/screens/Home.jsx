import { View, StyleSheet } from "react-native";
import Categories from "../components/Categories";
import { colors } from "../global/colors.js";

function Home({ navigation }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.container}>
        <Categories navigation={navigation} />
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.grayScale0,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
