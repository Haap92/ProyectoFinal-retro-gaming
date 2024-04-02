import { Text, Pressable, View, StyleSheet } from "react-native";
import { colors } from "../global/colors";
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/auth/authSlice";
import { deleteSession } from "../db/index";

function Header({ title }) {
  const { user, localId} = useSelector(state => state.authReducer.value)
  const dispatch = useDispatch();

  const onLogout = async () => {
    dispatch(clearUser())
    await deleteSession({ localId });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RETRO GAMING</Text>
      <Text style={styles.text}>{title}</Text>
      {user ? (        
        <Pressable style={styles.logout} onPress={onLogout}>
          <MaterialIcons name="logout" size={24} color={colors.mustard0}/>
        </Pressable>
      ) : null }
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    backgroundColor: colors.grayScale1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 40,
    textAlign: "center",
    color: colors.mustard0,
    fontSize: 20,
    fontFamily: "sixtyfourRegular",
  },
  text: {
    marginTop: 5,
    textAlign: "center",
    color: colors.mustard0,
    fontSize: 18,
    fontFamily: "oswaldBold",
  },
  logout: {
    position: "absolute",
    right: 20,
    top: 60
  }
});
