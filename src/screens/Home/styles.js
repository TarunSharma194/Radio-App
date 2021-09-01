import styled from "styled-components";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const EmptyView = styled.View``

export const Flex1 = styled.View`
  flex: 1
`

export const HomeThemeContainer = styled.View`
  padding-horizontal: 20px;
  padding-top: 5px;
  align-items: flex-end
`

export const HomeThemeInnerContainer = styled.View`
  width: 170px;
  height: 40px;
  background-color: #898C95;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  border-radius: 10px
`

export const ThemeText = styled.Text`
  font-size: 16px;
  margin-right: 5px;
  color: white
`

export const HeaderContainer = styled.View`
  padding-horizontal: 20px;
  justify-content: center;
  align-items: center
`

export const HeaderPrimaryText = styled.Text`
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 10px;
  color: ${_ => _.color}
`

export const HeaderSecondaryText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${_ => _.color}
`

export const CategoryContainer = styled.TouchableOpacity`
  margin-right: 10px;
  width: 100px;
  padding-vertical: 10px;
  height: 40px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  elevation: 2;
  background-color: ${_ => _.color}
`

export const CategoryText = styled.Text`
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  color: ${_ => _.color}
`

export const StationListContainer = styled.TouchableOpacity`
  flex: 1;
  margin: 10px;
  border-radius: 10px;
  width: ${parseInt(0.45 * width)}px;
  height: ${parseInt(0.3 * height)}px;
  align-items: center;
  padding-bottom: 5px;
  background-color: #4682B4;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  elevation: 2;
`

export const ImageContainer = styled.View`
  width: 100%;
  height: 60%;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  background-color: white
`

export const InfoContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-horizontal: 10px;
`

export const InfoTitle =  styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: white
`

export const InfoState =  styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: white
`

export const PaddingHorizontal = styled.View`
  padding-horizontal: ${_ => _.val}px;
`

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    borderRadius: 10,
    height: '100%',
    width: '100%'
  }
});
