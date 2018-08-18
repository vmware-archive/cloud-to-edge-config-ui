export interface GreenGrass {
  // AWS auth settings
  aws_access_key: string
  aws_secret_key: string

  // AWS Greengrass settings
  // This S3 bucket is used to store credentials, lambda code, etc.
  greengrass_s3_bucket: string


  // The role will create devices of the form {greengrass_device_stub}N, where N
// is between 1 and greengrass_device_count.
// These can be left undefined if no devices should be mass-created this way.
  greengrass_device_stub: string
  greengrass_device_count: 1


}
