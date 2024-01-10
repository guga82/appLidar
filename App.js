import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(200);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      
      <View style={styles.titleBar}>        
        <Image
          source={require('./assets/Logo.png')}
          style={styles.logo}
        />


        <Text style={styles.titleText}>Med Silos</Text>

        <TouchableOpacity onPress={() => console.log('Botão A')} style={styles.rightButton}>
          <Text style={styles.buttonText}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Botão B')} style={styles.rightButton}>
          <Text style={styles.buttonText}>B</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.body}>
        <Text style={styles.text}>
          Accelerometer: (in gs where 1g = 9.81 m/s^2)
        </Text>
        <Text style={styles.text}>x: {x}</Text>
        <Text style={styles.text}>y: {y}</Text>
        <Text style={styles.text}>z: {z}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={subscription ? _unsubscribe : _subscribe}
            style={styles.button}
          >
            <Text>{subscription ? "On" : "Off"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_slow}
            style={[styles.button, styles.middleButton]}
          >
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBar: {
    backgroundColor: '#FFC119',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1, // Title bar aways on the top
  },
  logo: {
    width: 100,
    height: 35,
    marginRight: 10,
    marginTop: 13,
    color: '#061835'
  },
  titleText: {
    color: '#061835',
    fontSize: 20,
  },
  rightButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#061835',
  },
  buttonText: {
    color: '#fff',
  },
  leftIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import * as Sensors from 'expo-sensors';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
