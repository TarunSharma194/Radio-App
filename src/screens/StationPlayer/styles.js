import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components";
const { width, height } = Dimensions.get('window');

export const Flex1 = styled.View`
  flex: 1
`

export const StationContainer = styled.View`
  width: ${width}px;
  justify-content: center;
  align-items: center;
  padding-vertical: 10px;
`

export const ImageContainer = styled.View`
  width: 100%;
  height: ${parseInt(0.5 * height)}px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px
`

export const InfoContainer = styled.View`
  justify-content: center;
  align-items: center;
`

export const InfoTitle =  styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${_ => _.color};
  margin-bottom: 20px;
  text-align: center;
  padding-horizontal: 10px;
`

export const InfoState =  styled.Text`
  font-size: 20px;
  color: ${_ => _.color};
`

export const ControlContainer = styled.View`
  flex-direction: row;
  width: ${parseInt(0.7 * width)}px;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`

export const VolumeSliderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center
`

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    borderRadius: 10,
    height: '100%',
    width: '100%'
  }
})
