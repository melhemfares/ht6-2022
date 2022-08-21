import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../utils/theme.js';
import { emailValidator, passwordValidator, pbFetch } from '../utils/utils.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
		setEmail({ ...email, error: emailError });
		setPassword({ ...password, error: passwordError });
		return;
    }
    let body = {
		email: email.value,
		password: password.value
    }
    let response = await fetch("http://localhost:3001/api/auth/login", {
		method: "post",
		body: JSON.stringify(body),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
    });
	if (!response.ok) {
		throw new Error("HTTP error status = " + response.status)
	} else {
		await response.json()
		.then((async (res) => {
			let accessToken = res.token;
			let name = res.user.name;
			await AsyncStorage.setItem("@auth_token", accessToken);
      props.signIn();
		}));
	}
    // .then((res) => {return res.json()})
  // .then(async (res) => {
  //   console.log(res);
  //   if (!res.ok) {
  //     return Promise.reject(res);
  //   } else {
  //     let accessToken = res.token;
	// 	  let name = res.user.name;
  //     console.log('statusCode:'+ res.status)
  //     console.log('Token:' + res.token)
  //     await AsyncStorage.setItem("@auth_token", accessToken);
  //     return Promise.resolve(res);
  //   }
  // });

  };

  return (
    <Background>

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Forgot Password')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(Login);