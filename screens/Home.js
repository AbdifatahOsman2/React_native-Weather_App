import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Location from "expo-location";
import wind from "../assets/wind-solid.svg";
import axios from "axios";

export default function Home() {
  const [long, setLong] = useState(null);
  const [lat, setLat] = useState(null);
  const [temp, settemp] = useState(null);
  const [min, setmin] = useState(null);
  const [max, setmax] = useState(null);
  const [wind, setwind] = useState(null);
  const [humidity, sethumidity] = useState(null);
  const [description, setdescription] = useState(null);
  const [city, setcity] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);
    })();
  }, []);

  async function getData() {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3616a57498522c3f1df43d6caaa2c964&units=imperial`
    );
    console.log(response.data)
    setdescription(response.data.weather[0].description);
    settemp(parseInt(response.data.main.temp));
    setmin(parseInt(response.data.main.temp_min));
    setmax(parseInt(response.data.main.temp_max));
    sethumidity(response.data.main.humidity);
    setwind(response.data.wind.speed);
  }
  getData();

  async function getCity() {
    const res = await axios.get(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=3616a57498522c3f1df43d6caaa2c964`
    );
    setcity(res.data[0].local_names.en);
  }
  getCity();

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{city}</Text>
      <View>
      <Text style={styles.des}>{description}</Text>
      <Text style={styles.temp}>{temp}°</Text>
      </View>
      <View>
      <Text style={styles.bot}>Wind speed: {wind}</Text>
      <Text style={styles.bot}>Humidity: {humidity}</Text>
      <Text style={styles.bot}>Max temperature: {max}°</Text>
      <Text style={styles.bot}>Min temperature: {min}°</Text>
      </View>

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
    justifyContent:'space-around',
    width: 500,
  },
  temp: {
    color: "white",
    fontSize: 180,
    textAlign: "left",
    fontFamily: "Arial",
  },
  des: {
    color: "white",
    fontSize: 50,
    textAlign: "center",
    marginRight: 30,
    fontWeight: "200",
  },
  bot: {
    color: "white",
    margin:10,
    fontSize: 25,
    textAlign: "center",
    fontStyle: "italic",
  },
  city: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
});
