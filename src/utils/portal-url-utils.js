import env from '../../env';

export const PORTAL_URL = env.PORTAL_URL;
// export const PERFIL_URL = env.PERFIL_URL;
// export const KEYCLOAK_URL = env.KEYCLOAK_URL;
// export const KEYCLOAK_REALM = env.KEYCLOAK_REALM;
// export const KEYCLOAK_CLIENT_ID = env.KEYCLOAK_CLIENT_ID;
// export const SMARTPASS_ENV = env.SMARTPASS_ENV;
// export const SMARTPASS_ENABLED = env.SMARTPASS_ENABLED;
// export const PI_CIDADAO_URL = env.PI_CIDADAO_URL;

const PORTAL_DOMAIN = '.pi.gov.br';

function getPortalAppRegex() {
  return new RegExp(`^(https?:\/\/.*${PORTAL_DOMAIN})?\/app\/`);
}

export function isPortalApp(link) {
  if (!link) {
    return false;
  }
  const portalAppRegex = getPortalAppRegex();
  return portalAppRegex.test(link) || link.startsWith('/app/');
}

export function getPortalPathArray(link) {
  const portalAppRegex = getPortalAppRegex();
  return link?.replace(portalAppRegex, '').split('/') || [];
}

export function formatPortalLink(link) {
  const pathArray = getPortalPathArray(link);
  const slug = pathArray[0];

  if (pathArray.length > 1) {
    return `${PORTAL_URL}/app/${pathArray.join('/')}`;
  }

  return `${PORTAL_URL}/app/${slug}`;
}
