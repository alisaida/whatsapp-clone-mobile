import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import * as WebBrowser from 'expo-web-browser'
import awsconfig from './aws-exports';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withOAuth, withAuthenticator } from "aws-amplify-react-native";
import * as Linking from 'expo-linking'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import logo from './assets/images/logo.png';
import googleLogo from './assets/images/googleLogo.png';
import facebookLogo from './assets/images/facebookLogo.png';
import { color } from 'react-native-reanimated';

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

const App = (props) => {

  const { oAuthUser,
    facebookSignIn,
    googleSignIn,
    signOut, } = props;

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {
          (user ? (<Navigation colorScheme={colorScheme} />)
            : (
              <SafeAreaView style={styles.background}>
                <View>
                  {/* <Button title="Cognito" onPress={hostedUISignIn} /> */}
                  <Image source={logo} style={styles.logo} />
                  {/* <Button title="Facebook" onPress={facebookSignIn} style={styles.facebook} /> */}
                  <TouchableOpacity onPress={googleSignIn} style={[styles.socialButton, { backgroundColor: 'white' }]}>
                    <Image source={googleLogo} style={styles.socialButtonIcon} />
                    <View style={styles.separator}></View>
                    <View style={styles.buttonContainer}>
                      <Text style={[styles.socialButtonText, { color: 'black' }]}>Sign in with Google</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={facebookSignIn} style={[styles.socialButton, { backgroundColor: '#227bef' }]}>
                    <Image source={facebookLogo} style={styles.socialButtonIcon} />
                    <View style={styles.separator}></View>
                    <View style={styles.buttonContainer}>
                      <Text style={[styles.socialButtonText, { color: 'white' }]}>Continue with Facebook</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            )
          )
        }

        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withOAuth(App);

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#455a64',
    height: '100%',
  },
  logo: {
    width: 400,
    height: 400,
    marginTop: 100,
    alignSelf: 'center',
  },
  socialButton: {
    width: 230,
    height: 40,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 10,
    flexDirection: 'row'
  },
  buttonContainer: {
    justifyContent: 'center',

  },
  socialButtonIcon: {
    width: 30,
    height: 30,
    borderRadius: 2,
    margin: 5
  },
  socialButtonText: {
    marginLeft: 10,
    textAlign: 'left',
  },
  separator: {
    borderLeftWidth: 3,
    borderColor: '#455a64',
    height: 40,
    marginRight: 2
  }

})