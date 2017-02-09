import { Mongo } from 'meteor/mongo';
import CollectionNames from '/lib/constants/collectionNames';

export default new Mongo.Collection(CollectionNames.queueHistory);
