// eslint-disable-next-line
const info = (...params: any[]) => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    console.log(...params);
  }
};

// eslint-disable-next-line
const error = (...params: any[]) => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    console.error(...params);
  }
};

export default {
  info, error
};