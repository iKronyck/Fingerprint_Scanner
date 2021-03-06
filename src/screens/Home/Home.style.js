import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export default StyleSheet.create({
  containerScreen: {
    flex: 1,
    backgroundColor: colors.primaryColorDark,
  },
  container: {
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  firstText: {color: 'white', fontSize: 24, paddingTop: 30},
  secondText: {color: 'white', fontSize: 24, fontWeight: 'bold'},
  buttonLogout: {
    backgroundColor: colors.primaryColorLight,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 100,
    borderRadius: 5,
  },
  textButton: {color: 'white', fontSize: 18},
});
