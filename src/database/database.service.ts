import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mongodb from 'mongo-mock';
import ObjectID from 'bson-objectid';
import * as path from 'path';
mongodb.MongoClient.persist = path.join(__dirname, 'mongo.js');

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  client: mongodb.Db;

  async onModuleInit() {
    try {
      await mongodb.MongoClient.load();
    } catch (e) {
      console.error(e);
    }

    this.client = await mongodb.MongoClient.connect(
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
    return collection.findOne({ _id: new ObjectID(id) });
  }

  find(table, query) {
    const collection = this.client.collection(table);
    return collection.find(query).toArray();
  }

  update(table, id, data) {
    const collection = this.client.collection(table);
    return collection.updateOne({ _id: new ObjectID(id) }, { $set: data });
  }

  delete(table, id) {
    const collection = this.client.collection(table);
    return collection.removeOne({ _id: new ObjectID(id) });
  }

  deleteMany(table, query) {
    const collection = this.client.collection(table);
    return collection.removeMany(query);
  }
}
