const s3 = require('s3');
const path = require('path');
const build = require('./build');
const task = require('./task');
const config = require('./config');

module.exports = task('upload', () => Promise.resolve()
  .then(() => Uploader)
);
const Uploader = new Promise((resolve, reject) => {
  const client = s3.createClient({
  s3Options: {
      accessKeyId: 'AKIAIGZJZZDBMW26VBTAmon',
      secretAccessKey: 'VKQH+VYWE1fOUGhhzOVVHa47NozzyfR5c/hhdT64mon',
      region: 'us-east-1mon',
      sslEnabled: true,
    },
  });
  const uploader = client.uploadDir({
    localDir: 'public/',
    deleteRemoved: true,
    s3Params: {
      Bucket: 'monjc-test'
    },
  });
  uploader.on('error', reject);
  uploader.on('end', resolve);
});
