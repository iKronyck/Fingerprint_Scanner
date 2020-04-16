import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColorDark,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
  },
  loading: {
    color: 'white',
  },
  imageContainer: {
    flexDirection: 'row',
    paddingTop: 140,
    width: '80%',
    justifyContent: 'space-around',
  },
  img: {
    width: 100,
    height: 100,
    tintColor: 'white',
  },
});
