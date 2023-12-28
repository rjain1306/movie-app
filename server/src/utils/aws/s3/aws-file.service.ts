import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { env } from '../../../env';

@Injectable()
export class AwsFilesService {
  constructor() {}

  async uploadFile(dataBuffer: Buffer, filename: string): Promise<any> {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: env.awsS3.bucketName,
        Body: dataBuffer,
        Key: filename,
      })
      .promise();
    return uploadResult;
  }

  downloadFile(key: string): any {
    const s3 = new S3();

    const params = {
      Bucket: env.awsS3.documentBucketName,
      Key: key
    };

    const stream =  s3.getObject(params).createReadStream();

    return stream;
  }

  async presignedUrl(key: string, displayFileName: string, fileType: string): Promise<any> {
    const s3 = new S3();

    // check display file extension.
    const displayName = displayFileName.split('.');

    const params = {
      Bucket: env.awsS3.documentBucketName,
      Key: key,
      Expires: 3600,
      ResponseContentDisposition: `inline; filename=${`${displayName[0]}.${fileType}`}`,
      ResponseContentType: 'application/pdf',
    };

    const url =  await s3.getSignedUrlPromise('getObject', params);

    return url;
  }

  async deleteFile(key: string): Promise<any> {
    try{
      const s3 = new S3();

      const params = {
        Bucket: env.awsS3.documentBucketName,
        Key: key
      };

      const outcome = await s3.deleteObject(params).promise();

      return outcome;
    } catch (error) {
      return {
        'error': error
      } ;
    }
  }
}
