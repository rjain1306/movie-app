import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileExtensionValidationPipe implements PipeTransform {
  allowedExtensions: string[];

  constructor(allowedExtensions: string[]) {
    this.allowedExtensions = allowedExtensions;
  }

  transform(file: any): any {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const fileExtension = extname(file.originalname).toLowerCase();

    if (!this.allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        `Invalid file extension. Allowed extensions are: ${this.allowedExtensions.join(
          ', ',
        )}`,
      );
    }

    return file;
  }
}
