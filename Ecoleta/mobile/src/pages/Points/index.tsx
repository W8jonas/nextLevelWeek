import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import MapboxGL from "@react-native-mapbox-gl/maps";

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

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>

          {/* <MapView style={styles.map} /> */}

          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.PointAnnotation
              id='rocketseat'
              coordinate={[-49.6446024, -27.2108001]}
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
        <TouchableOpacity style={styles.item}>

        </TouchableOpacity>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#7159C1',
    transform: [{ scale: 0.8 }],
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});


export default Points;