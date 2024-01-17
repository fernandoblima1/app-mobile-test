import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  StatusBar,
  Animated,
  SafeAreaView,
  Text,
} from 'react-native';

const cardHeight = 250;
const cardTitle = 45;
const cardPadding = 10;

const cards = [
  {
    name: 'Shot',
    color: '#EFF6FF',
    price: '30 CHF',
  },
  {
    name: 'Juice',
    color: '#DBEAFE',
    price: '64 CHF',
  },
  {
    name: 'Mighty Juice',
    color: '#BFDBFE',
    price: '80 CHF',
  },
  {
    name: 'Sandwich',
    color: '#93C5FD',
    price: '85 CHF',
  },
  {
    name: 'Combi',
    color: '#60A5FA',
    price: '145 CHF',
  },
  {
    name: 'Signature',
    color: '#3B82F6',
    price: '92 CHF',
  },
  {
    name: 'Coffee',
    color: '#2563EB',
    price: '47 CHF',
  },
];

const {height} = Dimensions.get('window');

const Page = () => {
  const [space, setSpace] = useState([]);
  const [coor, setCoor] = useState([]);

  useEffect(() => {
    const cardVals = cards.map((card, i, arr) => {
      const start = cardPadding * i;
      const end = (cardHeight - cardPadding) * -i;
      return {
        start,
        end,
      };
    });

    const coord = cardVals.map((item, i, arr) => {
      const start = cardTitle * i;
      let end = start + cardTitle;

      if (i === arr.length - 1) {
        end += cardHeight - cardTitle;
      }
      return {
        y1: start,
        y2: end,
        anim: new Animated.Value((cardHeight - cardTitle) * -i),
      };
    });

    setCoor(coord);
    setSpace(cardVals);
  }, []);

  const handleCardPress = index => {
    Animated.spring(coor[index].anim, {
      toValue: (cardHeight - cardTitle) * -index - index * cardTitle,
      duration: 300,
      useNativeDriver: true,
    }).start();

    coor.forEach((item, i) => {
      if (i !== index) {
        Animated.spring(item.anim, {
          toValue: (cardHeight - cardTitle) * cardTitle,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  const handleEmptySpacePress = () => {
    coor.forEach((item, i) => {
      Animated.spring(item.anim, {
        toValue: (cardHeight - cardTitle) * -i,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        onPress={handleEmptySpacePress}></TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {!!space.length &&
              cards.map((card, i) => (
                <TouchableOpacity
                  style={{
                    transform: [{translateY: coor[i].anim}],
                  }}
                  key={card.name}
                  onPress={() => handleCardPress(i)}>
                  <Animated.View
                    style={{
                      ...styles.card,
                      backgroundColor: card.color,
                    }}>
                    <Text>{card.name}</Text>
                  </Animated.View>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  Text: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    marginBottom: 16,
  },
  content: {
    height,
  },
  card: {
    height: cardHeight,
    borderRadius: 10,
    padding: 8,
  },
});

export default Page;
