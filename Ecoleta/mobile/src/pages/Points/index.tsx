import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from "@react-navigation/native"
import MapboxGL from "@react-native-mapbox-gl/maps"
import { SvgUri } from "react-native-svg"
import styles from "./styles"

const LINK = "http://192.168.2.2:3333/uploads/oleo.svg"

MapboxGL.setAccessToken("pk.eyJ1Ijoidzhqb25hcyIsImEiOiJja2JkeTh1aGQwZ2FuMzFtejQ4YTllaWpyIn0.a-hfivoMwtrR8m8m09HeMg");
MapboxGL.setConnected(true);

const Points = () => {
  const navigation = useNavigation()
  
  function handleNavigateBack() {
    navigation.goBack()
  }

  useEffect(()=>{
    MapboxGL.setTelemetryEnabled(false);
  },[])


  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={30} color="#34cb75" />
        </TouchableOpacity>

        <Text style={styles.title}>😍Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>

          <MapboxGL.MapView 
            style={styles.map}
            styleURL={MapboxGL.StyleURL.Dark}
          >
            <MapboxGL.Camera 
              centerCoordinate={[-43.7971312, -20.6719389]}
              zoomLevel={15}
            />

            <MapboxGL.PointAnnotation
              id='rocketseat'
              coordinate={[-43.7993284, -20.6689314]}
            >
              <View style={styles.annotationContainer}>
                <View style={styles.annotationFill} />
              </View>
              <MapboxGL.Callout title='Rocketseat House' />
            </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>

        </View>
      </View>
      
      <View style={styles.itemsContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={LINK}/>
            <Text style={styles.itemTitle}> QUALQUER COISA </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={LINK}/>
            <Text style={styles.itemTitle}> QUALQUER COISA </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={LINK}/>
            <Text style={styles.itemTitle}> QUALQUER COISA </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={LINK}/>
            <Text style={styles.itemTitle}> QUALQUER COISA </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={LINK}/>
            <Text style={styles.itemTitle}> QUALQUER COISA </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={()=>{}}>
            <SvgUri width={42} height={42} uri={LINK}/>
            <Text style={styles.itemTitle}> QUALQUER COISA </Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    </>
  )
}



export default Points;