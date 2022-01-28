import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import axios from 'axios';

export default function Home() {
  const [long, setLong ] = useState(null);
  const [lat, setLat] = useState(null);
  const [temp, settemp] = useState(null);
  const [min, setmin] = useState(null);
  const [max, setmax] = useState(null);
  const [humidity, sethumidity] = useState(null);
  const [description, setdescription] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
        let location = await Location.getCurrentPositionAsync({});
        setLat(location.coords.latitude)
        setLong(location.coords.longitude)
    })();
  }, []);

  async function getData () {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3616a57498522c3f1df43d6caaa2c964&units=imperial`)
    console.log(response.data)
    setdescription(response.data.weather[0].description)
    settemp(response.data.main.temp)
    setmin(response.data.main.temp_min)
    setmax(response.data.main.temp_max)
    sethumidity(response.data.main.humidity)
  }
  getData()
  console.log()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Home22
      </Text>
      <Text style={styles.text}>{temp}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d2026",
    alignItems: "center",
    justifyContent: "center",
    width: 500
  },
  text: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
  },
});
