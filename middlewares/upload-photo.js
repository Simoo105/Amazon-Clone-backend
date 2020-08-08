const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const wasabiEndpoint = new aws.Endpoint('s3.wasabisys.com');

aws.config.update({
    secretAccessKey: process.env.AwsSecretAccessKey,
    accessKeyId: process.env.AwsAccessKeyId
})

const s3 = new aws.S3({
    endpoint: wasabiEndpoint,
    region: 'us-east-1'
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'amazon-clone-v1',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { filedName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;