import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from "@react-navigation/native"
import MapboxGL from "@react-native-mapbox-gl/maps"
import { SvgUri } from "react-native-svg"
import styles from "./styles"
import api from '../../services/api'
// import Geolocation from '@react-native-community/geolocation';

const LINK = "http://192.168.2.2:3333/uploads/oleo.svg"

MapboxGL.setAccessToken("pk.eyJ1Ijoidzhqb25hcyIsImEiOiJja2JkeTh1aGQwZ2FuMzFtejQ4YTllaWpyIn0.a-hfivoMwtrR8m8m09HeMg");
MapboxGL.setConnected(true);


interface Item {
  id: number,
  title: string,
  image_url: string
}
interface Point {
  id: number,
  name: string,
  image: string,
  latitude: number,
  longitude: number,
}

const Points = () => {
  const navigation = useNavigation()

  const [items, setItems] = useState<Item[]>([])
  const [points, setPoints] = useState<Point[]>([])

  const [selectedItems, setSelectedItems] = useState<number[]>([])
  
  const [initialPosition, setInitialPosition] = useState<number[]>([1, 0])

  useEffect(()=>{
    api.get('items').then((response)=>{
      setItems(response.data)
    })
  }, [])

  useEffect(()=>{
    api.get('points',{
      params: {
        city: 'lafaiete',
        uf: "mg",
        items: [1, 2, 3, 4, 5, 6]
      }
    }).then((response)=>{
      console.log('response.data: ', response.data);
      
      setPoints(response.data)
    })
  }, [])

  useEffect(()=>{
    // const status = Geolocation.requestAuthorization()
    // console.log(status);
    
    // Geolocation.getCurrentPosition(info => console.log(info));

  }, [])


  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item)=> item === id)

    if (alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => item !== id)
        setSelectedItems(filteredItems)
    }else {
        setSelectedItems([...selectedItems, id])
    }
  }

  function handleNavigateBack() {
    navigation.goBack()
  }
  
  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', {point_id: id})
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

          {initialPosition[0] !== 0 &&
            <MapboxGL.MapView 
            style={styles.map}
            styleURL={MapboxGL.StyleURL.Dark}
          >
            <MapboxGL.Camera 
              centerCoordinate={[-43.7971312, -20.6719389]}
              zoomLevel={2}
            />
            {points.map((point)=>(
              <MapboxGL.MarkerView
                key={`${point.id}`}
                id='rocketseat'
                coordinate={[point.latitude, point.longitude]}
                onSelected={()=>handleNavigateToDetail(point.id)}
              >

                <View style={styles.mapMarkerContainer}>
                  <Image style={styles.mapMarkerImage} source={{uri: point.image}} />
                  <Text style={styles.mapMarkerTitle}>
                    {point.name}
                  </Text>
                </View>
              </MapboxGL.MarkerView>
            ))}

          </MapboxGL.MapView>}

        </View>
      </View>
      
      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}
        >
          {items.map((item)=> (
            <TouchableOpacity
              activeOpacity={0.5}
              key={`${item.id}`} 
              style={[
                styles.item, 
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]} 
              onPress={()=>{handleSelectItem(item.id)}}
            >
              <SvgUri width={42} height={42} uri={item.image_url}/>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  )
}

export default Points;