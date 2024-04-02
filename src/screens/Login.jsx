import { Text, View, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useLoginMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { loginSchema } from "../validations/loginSchema";
import { insertSession } from "../db/index";
import { commonStyles } from '../global/commonStyles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [triggerSignin, result] = useLoginMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (result.data) {
      dispatch(setUser(result.data));
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken
      })
      .then((result) => console.log(result))
      .catch(error => console.log(error.message))
    }
  }, [result]);

  const onSubmit = () => {
    try {
      loginSchema.validateSync({ password, email });
      triggerSignin({ email, password });
    } catch (err) {
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
          break;
        case "password":
          setErrorPassword(err.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={commonStyles.headerContainer}>
      <View style={commonStyles.container}>
        <InputForm label={"Email"} error={errorMail} onChange={setEmail} />
        <InputForm
          label={"Password"}
          error={errorPassword}
          onChange={setPassword}
          isSecure={true}
        />
        {result.isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={commonStyles.buttonContainer}>
            <SubmitButton title={"Login"} onPress={onSubmit} />
          </View>
        )}
        <View style={commonStyles.rowContainer}>
          <Text style={commonStyles.loginText}> Don't hava an Account? </Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={commonStyles.linkText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
