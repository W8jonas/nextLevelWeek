import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { useNavigation, useRoute } from "@react-navigation/native"
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'

interface Params {
  point_id: number
}
interface Point {

}
interface Data {
  point: {
    image: string,
    name: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string,
  }
  items: {
    title: string,
  }[]
}

const Detail = () => {
  const navigation = useNavigation()
  const route = useRoute()
  
  const routeParams = route.params as Params

  const [data, setData] = useState<Data>({} as Data)

  useEffect(()=>{
    api.get(`points/${routeParams.point_id}`).then(response => {
      setData(response.data)
    }).catch(error=>console.log('error: ', error))
  }, [])

  useEffect(()=>{}, [])
    
  function handleNavigateBack() {
    navigation.goBack()
  }

  if (!data.point){
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'}/>
      </View>
    )
  }

  return (
    <>
    <View style={styles.container}>

      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name="arrow-left" size={30} color="#34cb75" />
      </TouchableOpacity>

      <Image style={styles.pointImage} source={{uri: data.point.image}}/>
      
      <Text style={styles.pointName}>{data.point.name}</Text>
      <Text style={styles.pointItems}>
        {data.items.map(({title})=> title). join(', ')}
      </Text>

      <View style={styles.address}>
        <Text style={styles.addressTitle}>Endereço</Text>
        <Text style={styles.addressContent}>{data.point.uf}, {data.point.city}</Text>
      </View>
    </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={()=>{}}>
          <Icon2 name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={()=>{}}>
          <Icon2 name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </>
  )
}

export default Detail;
