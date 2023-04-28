import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // Replace with the address(es) of your Kafka broker(s)
});

const consumer = kafka.consumer({ groupId: 'my-group' });

const run = async () => {
  // Connect the consumer
  await consumer.connect();

  // Subscribe to a topic
  await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

  // Process incoming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        key: message.key.toString(),
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
