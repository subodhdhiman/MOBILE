import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Animated from 'react-native-reanimated'

const ModalPopup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible)
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    toggleModal();
  },
    [visible]
  );
  const toggleModal = () => {
    if (visible) {
      setShowModal(true)
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(()=>setShowModal(false),200 )
      
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
   }
 }
  
  return <Modal transparent visible={showModal}>
    <View style={styles.modalBackgrond}>
      <Animated.View style={[styles.modalContainer, {
        transform: [{ scale: scaleView }]
      }]}>
            {children}
      </Animated.View>
      </View>
  </Modal>

}

const styles = StyleSheet.create({
  modalBackgrond: {
    flex: 1,
    backgroundColor: 'rgb(0,0,1,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
   modalContainer: {
    width: '80%',
    backgroundColor: 'white',
     paddingHorizontal: 20,
     paddingVertical: 30,
    borderRadius: 20,
    elevation: 20
  }
})

export default  ModalPopup