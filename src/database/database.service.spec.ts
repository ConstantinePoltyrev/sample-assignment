import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let docId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    await module.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a record', async () => {
    const rec = { name: 'Costya', age: 52 };
    const doc = await service.create('test', rec);
    expect(doc.name).toEqual('Costya');
    expect(doc._id).toBeTruthy();
    docId = doc._id;
  });
  it('should find a record', async () => {
    const doc = await service.findById('test', docId);
    expect(doc).toBeTruthy();
    expect(doc.name).toEqual('Costya');
  });
  it('should list records', async () => {
    await service.create('test', { name: 'John', age: 32 });
    await service.create('test', { name: 'Jane', age: 27 });
    const docs = await service.find('test', { age: { $gt: 28 } });
    expect(docs).toBeTruthy();
    expect(docs.length).toEqual(2);
  });
  it('should update a record', async () => {
    const res = await service.update('test', docId, { age: 51 });
    expect(res.result.ok).toEqual(1);
  });
  it('should delete a record', async () => {
    const res = await service.delete('test', docId);
    expect(res.deletedCount).toEqual(1);
  });
  it('should delete many records', async () => {
    const res = await service.deleteMany('test', { age: { $gt: 25 } });
    expect(res.deletedCount).toEqual(2);
  });
});
