import React, {useState, useEffect} from 'react';
import Logo from '../../assets/logo.svg';
import Id from '../../assets/idTag.svg';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Animated,
  SafeAreaView,
  Text,
} from 'react-native';

const cardHeight = 220;
const cardTitle = 60;

const cards = [
  {
    id: '1',
    files: [
      {
        name: 'PDF_PAGINADO',
        path: 'string',
        mimeType: 'application/pdf',
      },
    ],
    metadata: {
      title: 'CARTEIRA DO AUTISTA',
      isCarousel: true,
      isId: false,
      fields: [],
      owner: 'LUIS FERNANDO BORGES DE LIMA',
      validity: '2021-12-31',
      orgao: 'SEID/PI',
      createdAt: '2021-01-01',
      footerCard: 'NÚMERO',
      footerDescription: '618485',
    },
    documentType: 'CARTEIRA DO AUTISTA',
    documentNumber: '618485',
  },
  {
    id: '2',
    files: [
      {
        name: 'PDF_PAGINADO',
        path: 'string',
        mimeType: 'application/pdf',
      },
    ],
    metadata: {
      title: 'CARTEIRA NACIONAL DE TRÂNSITO',
      isCarousel: true,
      isId: true,
      fields: [],
      owner: 'Luiza Maria da Rocha',
      validity: '2021-12-31',
      createdAt: '10/24',
      orgao: 'DETRAN/PI',
      footerCard: 'NÚMERO',
      footerDescription: '618485',
    },
    documentType: 'CARTEIRA DO AUTISTA',
    documentNumber: '618485',
  },
  {
    id: '3',
    files: [
      {
        name: 'PDF_PAGINADO',
        path: 'string',
        mimeType: 'application/pdf',
      },
    ],
    metadata: {
      title: 'CARTEIRA NACIONAL DE TRÂNSITO',
      isCarousel: true,
      isId: true,
      fields: [],
      owner: 'Luiza Maria da Rocha',
      validity: '2021-12-31',
      createdAt: '10/24',
      orgao: 'DETRAN/PI',
      footerCard: 'NÚMERO',
      footerDescription: '618485',
    },
    documentType: 'CARTEIRA DO AUTISTA',
    documentNumber: '618485',
  },
  {
    id: '4',
    files: [
      {
        name: 'PDF_PAGINADO',
        path: 'string',
        mimeType: 'application/pdf',
      },
    ],
    metadata: {
      title: 'CARTEIRA NACIONAL DE TRÂNSITO',
      isCarousel: true,
      isId: true,
      fields: [],
      owner: 'Luiza Maria da Rocha',
      validity: '2021-12-31',
      createdAt: '10/24',
      orgao: 'DETRAN/PI',
      footerCard: 'NÚMERO',
      footerDescription: '618485',
    },
    documentType: 'CARTEIRA DO AUTISTA',
    documentNumber: '618485',
  },
];

const colors = ['#007236', '#034EA2'];
const Page = () => {
  const [coor, setCoor] = useState([{anim: new Animated.Value(0)}]);

  useEffect(() => {
    const coord = cards.map((item, i, arr) => {
      return {
        anim: new Animated.Value((cardHeight - cardTitle) * -i),
      };
    });
    setCoor(coord);
  }, []);

  const handleCardPress = index => {
    Animated.spring(coor[index].anim, {
      toValue: (cardHeight - cardTitle) * -index - index * cardTitle,
      duration: 300,
      useNativeDriver: true,
    }).start();

    coor.forEach((item, i) => {
      let toValue = 300 - (cardHeight - cardTitle) * i;
      if (i != index) {
        Animated.spring(item.anim, {
          toValue: toValue,
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
            {cards.map((card, i) => {
              return (
                <TouchableOpacity
                  style={{
                    borderRadius: 25,
                    elevation: 16,
                    shadowOpacity: 0.36,
                    shadowRadius: 6.68,
                    shadowColor: '#000',
                    transform: [{translateY: coor[i]?.anim || 0}],
                  }}
                  key={card.id}
                  onPress={() => handleCardPress(i)}>
                  <Animated.View
                    style={{
                      ...styles.card,
                      backgroundColor: colors[i % colors.length],
                    }}>
                    {card.metadata.isId && (
                      <View style={styles.idTagContainer}>
                        <Id width="50" height="50" style={styles.idTag} />
                        <Text style={styles.idText}>ID</Text>
                      </View>
                    )}
                    <Logo width={205} height={205} style={styles.logo} />
                    <View style={[styles.textView]}>
                      <Text style={styles.title}>{card.metadata.title}</Text>
                      <Text style={[styles.title, styles.owner]}>
                        {card.metadata.owner}
                      </Text>
                    </View>
                    <View style={[styles.textView]}>
                      <Text style={styles.title}>
                        {card.metadata.footerCard}
                      </Text>
                      <Text style={[styles.title, styles.owner]}>
                        {card.metadata.footerDescription}
                      </Text>
                    </View>
                    <View style={styles.doubleTextView}>
                      <View style={[styles.textView]}>
                        <Text style={styles.title}>ORGÃO</Text>
                        <Text style={[styles.title, styles.description]}>
                          {card.metadata.orgao}
                        </Text>
                      </View>
                      <View style={[styles.textView]}>
                        <Text style={styles.title}>EXPEDIÇÃO</Text>
                        <Text style={[styles.title, styles.owner]}>
                          {card.metadata.createdAt}
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
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
    marginHorizontal: 14,
  },
  doubleTextView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 100,
  },
  textView: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: '#fff',
  },
  owner: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
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
  logo: {
    right: -20,
    top: 10,
    position: 'absolute',
  },
  idTagContainer: {
    position: 'absolute',
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  idText: {
    color: '#fff',
    position: 'absolute',
    padding: 7,
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    height: cardHeight,
    borderRadius: 25,
    paddingTop: 18,
    paddingHorizontal: 20,
  },
});

export default Page;
