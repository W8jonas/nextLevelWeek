import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from "@react-navigation/native"
import MapboxGL from "@react-native-mapbox-gl/maps"
import { SvgUri } from "react-native-svg"
import styles from "./styles"
import api from '../../services/api'

const LINK = "http://192.168.2.2:3333/uploads/oleo.svg"

MapboxGL.setAccessToken("pk.eyJ1Ijoidzhqb25hcyIsImEiOiJja2JkeTh1aGQwZ2FuMzFtejQ4YTllaWpyIn0.a-hfivoMwtrR8m8m09HeMg");
MapboxGL.setConnected(true);


interface Item {
  id: number,
  title: string,
  image_url: string
}

const Points = () => {
  const navigation = useNavigation()

  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  useEffect(()=>{
    api.get('items').then((response)=>{
      setItems(response.data)
    })
  }, [])

  useEffect(()=>{}, [])

  useEffect(()=>{}, [])

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
  
  function handleNavigateToDetail() {
    navigation.navigate('Detail')
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
              onSelected={handleNavigateToDetail}
            >
              {/* <View style={styles.annotationContainer}>
                <View style={styles.annotationFill} />
              </View> */}

              <View style={styles.mapMarkerContainer}>
                <Image style={styles.mapMarkerImage} source={{uri:'https://images.unsplash.com/photo-1592014876894-139779163b5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'}} />
                <Text style={styles.mapMarkerTitle}>
                  Alo Você!
                </Text>
              </View>

            </MapboxGL.PointAnnotation>

          </MapboxGL.MapView>

        </View>
      </View>
      
      <View style={styles.itemsContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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