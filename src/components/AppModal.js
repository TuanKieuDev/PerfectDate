import { StyleSheet, Text, View , Modal, Pressable} from 'react-native'
import AppText from './Text'
import React from 'react'
import StylesShare from '../config/styles'
import { useNavigation } from '@react-navigation/native'

const AppModal = ({visible, onRequestClose, headerTitle, bodyContent, onPress, screenName}) => {
  const navigation = useNavigation()

  return (
    <Modal visible={visible} transparent onRequestClose={onRequestClose}>
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <View style={styles.warning_title}>
              <AppText style={styles.warningTxt}>
                  {/* Lên lịch thành công */}
                  {headerTitle}
              </AppText>
            </View>
            <View style={styles.warningBody}>
              <AppText>
                {/* Mọi thông tin về cuộc hẹn sẽ được gửi về
                email của quý khách trong thời gian sớm nhất. Xin trân thành cảm
                ơn quý khách */}
                {bodyContent}
              </AppText>
            </View>
            <Pressable
              onPress={onPress}
              style={styles.warningBtn}
              android_ripple={{color: '#fff'}}
            >
              <AppText style={{color: StylesShare.app}}>OK</AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
  )
}

export default AppModal

const styles = StyleSheet.create({
    centered_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
      },
      warning_modal: {
        width: 300,
        height: 180,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
      },
      warning_title: {
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius:20,
        borderTopRightRadius: 20,
        backgroundColor: StylesShare.app,
      },
      warningTxt: {
        color: '#fff',
        fontSize:22,
      },
      warningBody: {
        padding:10,
      },
      warningBtn: {
        // alignItems: 'flex-end',
        // paddingRight: 10,
        position: 'absolute',
        bottom: 15,
        right: 15,
      }
})