// eslint-disable-next-line
const info = (...params: any[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(new Date().toISOString());
    // eslint-disable-next-line
    console.log(...params, '\n');
  }
};

// eslint-disable-next-line
const error = (...params: any[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(new Date().toISOString());
    // eslint-disable-next-line
    console.error(...params, '\n');
  }
};

export default {
  info, error
};