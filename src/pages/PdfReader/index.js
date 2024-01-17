import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text, Linking} from 'react-native';
import Pdf from 'react-native-pdf';
import {pdfUri} from '../../constants/pdf';
export default function PdfReader() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Defina o número total de páginas do seu PDF

  const source = {
    uri: pdfUri,
    cache: true,
  };

  const onPageChanged = (page, numberOfPages) => {
    setCurrentPage(page);
    setTotalPages(numberOfPages);
  };

  const renderPageIndicators = () => {
    const indicators = [];
    for (let i = 1; i <= totalPages; i++) {
      indicators.push(
        <View
          key={i}
          style={[
            styles.pageIndicator,
            {backgroundColor: i === currentPage ? 'blue' : 'gray'},
          ]}
        />,
      );
    }
    return indicators;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.idTitleBox}>
          <Text style={styles.idTitle}>DOCUMENTO DE IDENTIFICAÇÃO</Text>
        </View>
        <View style={styles.pdfView}>
          <Pdf
            enablePaging={true}
            enableRTL={false}
            vertical
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Número total de páginas: ${numberOfPages}`);
              setTotalPages(numberOfPages);
            }}
            onPageChanged={(page, numberOfPages) =>
              onPageChanged(page, numberOfPages)
            }
            style={styles.pdf}
            source={source}
          />
        </View>
        <View style={styles.pageIndicatorContainer}>
          {renderPageIndicators()}
        </View>
        <View style={styles.footer}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Verifique a autenticidade do QR Code com o serviço de
          </Text>
          <Text
            style={{
              color: 'blue',
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 'bold',
            }}
            onPress={() => {
              Linking.openURL('https://pidigital.pi.gov.br');
            }}>
            validação de assinatura digital
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  container: {
    width: '90%',
    height: '80%',
  },
  idTitleBox: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  idTitle: {
    textAlign: 'center',
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    color: 'white',
    backgroundColor: 'orange',
  },
  pdf: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfView: {
    transform: [{rotate: '-90deg'}],
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  pageIndicator: {
    backgroundColor: 'gray',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
