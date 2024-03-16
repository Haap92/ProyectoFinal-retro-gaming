import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import { useSignUpMutation } from "../services/authService";
import SubmitButton from "../components/SubmitButton";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { signupSchema } from "../validations/signupSchema";
import { colors } from "../global/colors.js"

const Signup = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [triggerSignup, result] = useSignUpMutation();

  const dispatch = useDispatch();

  const onSubmit = () => {

    try {
      setErrorMail("");
      setErrorPassword("");
      setErrorConfirmPassword("");

      signupSchema.validateSync({ password, confirmPassword, email });
      triggerSignup({ email, password });
    } catch (err) {
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
          break;
        case "password":
          setErrorPassword(err.message);
          break;
        case "confirmPassword":
          setErrorConfirmPassword(err.message);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (result.data) {
      dispatch(setUser(result.data));
    }
  }, [result]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.container}>
        <InputForm label={"Email"} error={errorMail} onChange={setEmail} />
        <InputForm
          label={"Password"}
          error={errorPassword}
          onChange={setPassword}
          isSecure={true}
        />
        <InputForm
          label={"Confirm password"}
          error={errorConfirmPassword}
          onChange={setConfirmPassword}
          isSecure={true}
        />
        <View style={styles.buttonContainer}>
          <SubmitButton title={"Register"} onPress={onSubmit} />
        </View>
        <View style={styles.rowContainer}>
        <Text style={styles.loginText}> Already hava an Account? </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Login</Text>
        </Pressable>
      </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.grayScale0
  },
  container: {
    flex: 1,
    width: "100%",
    marginTop: 30
  },
  rowContainer:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  buttonContainer:{
    width: "100%",
    alignItems: "center",
    marginTop: 30
  },
  loginText: {
    fontSize: 16,
    color: "white",
    fontFamily: "oswaldRegular",
  },
  linkText: {
    fontSize: 16,
    color: colors.mustard0,
    fontFamily: "oswaldRegular",
  }
});
