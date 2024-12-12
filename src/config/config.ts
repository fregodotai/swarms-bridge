import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 4545,
};

export default config;
