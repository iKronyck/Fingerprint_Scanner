import React from 'react';
import {View, Text, SafeAreaView, StatusBar, Image} from 'react-native';
import styles from './Home.style';
import Person from '../../assets/img/person.png';

const Home = () => {
  return (
    <View style={styles.containerScreen}>
      <SafeAreaView style={styles.containerScreen}>
        <StatusBar
          translucent
          animated
          barStyle="light-content"
          backgroundColor={styles.containerScreen.backgroundColor}
        />
        <View style={styles.container}>
          <Image style={styles.image} source={Person} />
          <Text style={styles.firstText}>
            Welcome back <Text style={styles.secondText}>Israel</Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
