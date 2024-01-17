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

const Page = ({navigation}) => {
  const [selected, setSelected] = useState(5);
  const [space, setSpace] = useState([]);
  const [coor, setCoor] = useState([]);
  const [y] = useState(new Animated.Value(0));

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

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              Animated.parallel(
                coor.map((item, i) =>
                  Animated.spring(item.anim, {
                    bounciness: 4,
                    toValue: (cardHeight - cardTitle) * -i,
                    duration: 500,
                    useNativeDriver: true,
                  }),
                ),
              ).start(() => {
                setSelected(null);
              });
            }}>
            {selected && <Text>Done</Text>}
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
              {!!space.length &&
                cards.map((card, i) => {
                  const inputRange = [-cardHeight, 0];
                  const outputRange = [
                    cardHeight * i,
                    (cardHeight - cardTitle) * -i,
                  ];
                  if (i > 0) {
                    inputRange.push(space[i].start);
                    outputRange.push(space[i].end);
                  }
                  const translateY = y.interpolate({
                    inputRange,
                    outputRange,
                    extrapolateRight: 'clamp',
                  });
                  if (selected) {
                    if (selected === i) {
                      return (
                        <Animated.View
                          key={card.name}
                          style={{
                            ...styles.card,
                            backgroundColor: card.color,
                            transform: [
                              {
                                translateY: coor[i].anim,
                              },
                            ],
                          }}>
                          <Text>{card.color}</Text>
                        </Animated.View>
                      );
                    } else {
                      return (
                        <Animated.View
                          key={card.name}
                          style={{
                            ...styles.card,
                            backgroundColor: card.color,
                            transform: [
                              {
                                translateY: coor[i].anim,
                              },
                            ],
                          }}>
                          <Text>{card.name}</Text>
                        </Animated.View>
                      );
                    }
                  }
                  return (
                    <Animated.View
                      key={card.name}
                      style={{
                        ...styles.card,
                        opacity: 1,
                        backgroundColor: card.color,
                        transform: [{translateY}],
                      }}>
                      <Text>card {i}</Text>
                    </Animated.View>
                  );
                })}
            </View>
            <Animated.ScrollView
              scrollEventThrottle={16}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {y},
                    },
                  },
                ],
                {useNativeDriver: true},
              )}>
              <TouchableOpacity
                onPress={evt => {
                  const posY = evt.nativeEvent.locationY;
                  coor.forEach(({y1, y2}, i) => {
                    if (posY >= y1 && posY <= y2) {
                      setSelected(i);

                      Animated.spring(coor[i].anim, {
                        toValue: (cardHeight - cardTitle) * -i - i * cardTitle,
                        duration: 300,
                        useNativeDriver: true,
                      }).start();
                    } else {
                      Animated.spring(coor[i].anim, {
                        toValue: (cardHeight - cardTitle) * -i,
                        duration: 500,
                        useNativeDriver: true,
                      }).start();
                    }
                  });
                }}
                style={[
                  {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    height: cards.length * 75,
                  },
                ]}
              />
            </Animated.ScrollView>
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
