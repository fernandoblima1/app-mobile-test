import portalAPI from '../api/portalApi';

export const loadDigitalDocuments = async token => {
  const result = await portalAPI.get('/v1/digital-document', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return result.data;
};
