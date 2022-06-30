const { ServiceBusClient } = require("@azure/service-bus");
const { EventGridDeserializer, AzureKeyCredential } = require("@azure/eventgrid");
const {azure_key_cred, service_bus_conn_string, queue_name} = require("./config");

const client = new ServiceBusClient(service_bus_conn_string, new AzureKeyCredential(azure_key_cred));

const receiver = client.createReceiver(queue_name);

const consumer = new EventGridDeserializer();

console.log("starting receiver");

receiver.subscribe({
  processError: async (err) => {
    console.error(err);
  },
  processMessage: async(message) => {
    const event = (await consumer.deserializeEventGridEvents(message.body))[0];
    console.log(event.data);
  }
});
