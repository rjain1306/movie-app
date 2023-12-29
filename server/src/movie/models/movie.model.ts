import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { AuditInfo } from '../../core/domain';

@Entity({
  schema: 'public',
})
export class Movie extends BaseEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    nullable: false,
  })
  private readonly _id: string;

  @AutoMap()
  public get id(): string {
    return this._id;
  }
  

  @Column({
    name: 'title',
    type: 'varchar',
    nullable: false,
  })
  private _title: string;

  @AutoMap()
  public get title(): string {
    return this._title;
  }

  @Column({
    name: 'publish_year',
    type: 'varchar',
    nullable: false,
  })
  private _publishYear: string;

  @AutoMap()
  public get publishYear(): string {
    return this._publishYear;
  }
  
  @Column({
    name: 'image_url',
    type: 'varchar',
    nullable: true,
  })
  private _imageUrl: string;

  @AutoMap()
  public get imageUrl(): string {
    return this._imageUrl;
  }

  @Column(() => AuditInfo, { prefix: false })
  private _auditInfo: AuditInfo;

  @AutoMap()
  public get auditInfo(): AuditInfo {
    return this._auditInfo;
  }

  constructor(
    id: string,
    title: string,
    publishYear: string,
    imageUrl: string,
    createdBy?: string,
  ) {
    super();
    this._id = id;
    this._title = title;
    this._publishYear = publishYear;
    this._imageUrl = imageUrl;
    this._auditInfo = new AuditInfo(createdBy);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  update(
    title: string,
    publishYear: string,
    imageUrl: string,
  ) {
    this._title = title;
    this._publishYear = publishYear;
    this._imageUrl = imageUrl;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public setMovieImage(imageUrl: string, modifiedBy: string = '') {
    this._imageUrl = imageUrl;
    this._auditInfo.setUpdated(modifiedBy);
  }

}
