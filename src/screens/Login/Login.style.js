import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export default StyleSheet.create({
  containerScreen: {
    flex: 1,
    backgroundColor: colors.primaryColorDark,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    width: '80%',
    justifyContent: 'space-around',
  },
  img: {width: 100, height: 100, tintColor: 'white'},
  images: {
    flexDirection: 'row',
    paddingBottom: 10,
    width: '80%',
    justifyContent: 'space-around',
  },
  image: {
    flexDirection: 'row',
    paddingBottom: 10,
    width: '80%',
    justifyContent: 'space-around',
  },
  text: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  secureTextContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    width: '80%',
    backgroundColor: 'white',
  },
  eyeContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeImage: {
    width: 35,
    height: 35,
    tintColor: '#003c8f',
    backgroundColor: 'white',
  },
  inputContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    width: '100%',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: 'bold',
    height: 50,
    width: '80%',
  },
  button: {
    backgroundColor: colors.primaryColorLight,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '80%',
    borderRadius: 15,
  },
  textButton: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
