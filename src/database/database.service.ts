import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mongodb from 'mongo-mock';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  mongo = mongodb.MongoClient;
  client: mongodb.Db;

  constructor() {
    this.mongo.persist = 'mongo.js';
  }

  async onModuleInit() {
    this.client = await this.mongo.connect(
      'mongodb://localhost:27017/sampledb',
    );
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  create(table, data) {
    const collection = this.client.collection(table);
    return collection.insertOne(data).then((resp) => resp.ops[0]);
  }

  findById(table, id: string) {
    const collection = this.client.collection(table);
    return collection.findOne({ _id: id });
  }

  find(table, query) {
    const collection = this.client.collection(table);
    return collection.find(query).toArray();
  }

  update(table, id, data) {
    const collection = this.client.collection(table);
    return collection.updateOne({ _id: id }, { $set: data });
  }

  delete(table, id) {
    const collection = this.client.collection(table);
    return collection.removeOne({ _id: id });
  }

  deleteMany(table, query) {
    const collection = this.client.collection(table);
    return collection.removeMany(query);
  }
}
