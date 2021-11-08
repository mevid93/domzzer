import jwt from "jsonwebtoken";
import config from "../utils/config";

const checkLitePrivileges = (token: string | undefined): string | undefined => {
  // eslint-disable-next-line
  const decodedToken = token !== undefined ? <any>jwt.verify(token, config.SECRET) : undefined;
  if (!token || !decodedToken.id) {
    return 'Token missing or invalid!';
  }

  return undefined;
};

const checkProPrivileges = (token: string | undefined): string | undefined => {
  // eslint-disable-next-line
  const decodedToken = token !== undefined ? <any>jwt.verify(token, config.SECRET) : undefined;
  if (!token || !decodedToken.id) {
    return 'Token missing or invalid!';
  }

  if (!decodedToken.userRole || decodedToken.userRole === 'LITE') {
    return 'Insufficient privileges to complete the operation!';
  }

  return undefined;
};

const checkAdminPrivileges = (token: string | undefined): string | undefined => {
  // eslint-disable-next-line
  const decodedToken = token !== undefined ? <any>jwt.verify(token, config.SECRET) : undefined;
  if (!token || !decodedToken.id) {
    return 'Token missing or invalid!';
  }

  if (!decodedToken.userRole || decodedToken.userRole !== 'ADMIN') {
    return 'Insufficient privileges to complete the operation!';
  }

  return undefined;
};

const checkTokenMatchesUserId = (token: string | undefined, id: string | undefined): string | undefined => {
  // eslint-disable-next-line
  const decodedToken = token !== undefined ? <any>jwt.verify(token, config.SECRET) : undefined;
  if (!token || !decodedToken.id) {
    return 'Token missing or invalid!';
  }

  if (decodedToken.userRole !== 'ADMIN' && decodedToken.id !== id) {
    return 'Insufficient privileges to complete the operation!';
  }

  return undefined;
};

export default {
  checkLitePrivileges,
  checkProPrivileges,
  checkAdminPrivileges,
  checkTokenMatchesUserId,
};