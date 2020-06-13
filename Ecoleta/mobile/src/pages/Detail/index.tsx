import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from "@react-navigation/native"
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'


const Detail: React.FC = () => {
  const navigation = useNavigation()
  
  function handleNavigateBack() {
    navigation.goBack()
  }

  return (
    <>
    <View style={styles.container}>

      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name="arrow-left" size={30} color="#34cb75" />
      </TouchableOpacity>

      <Image style={styles.pointImage} source={{uri: "https://images.unsplash.com/photo-1592014876894-139779163b5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"}}/>
      
      <Text style={styles.pointName}>Mercadao</Text>
      <Text style={styles.pointItems}>Lampada_e_outros</Text>

      <View style={styles.address}>
        <Text style={styles.addressTitle}> adasd</Text>
        <Text style={styles.addressContent}> adasd</Text>
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
