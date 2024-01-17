import React, {useEffect, useState} from 'react';
import TopPlacesCarousel from '../../components/Swiper';
import {Text, View} from 'react-native';
import {colors, shadow} from '../../constants/theme';
import {loadDigitalDocument} from '../../store/digital-document-store';

const Wallet = () => {
  const document = {
    metadata: {
      title: 'Carteira de Identificação do Autista',
      isId: false,
      isCarousel: true,
      description: 'Carteira de Identificação do Autista',
      owner: 'FRANCISCO HELIELSON MACEDO DE SOUSA',
      validity: '2028-07-12',
      createdAt: '2023-07-13',
      fields: null,
      footerTitle: 'Número',
      footerDescription: '6389',
    },
    documentType: 'carteira_autista',
    documentNumber: '6389',
  };
  const documents = [document, document, document, document, document];
  return (
    <View>
      <Text>Confira seus documentos</Text>
      <View>
        <TopPlacesCarousel list={documents} />
      </View>
    </View>
  );
};

export default Wallet;
