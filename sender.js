const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");
const {topic_endpoint, azure_key_cred} = require("./config");

const client = new EventGridPublisherClient(topic_endpoint, "EventGrid", new AzureKeyCredential(azure_key_cred));

const x= async()=>{
  let x=10;
  while(x>0) {
    await client.send([
      {
        eventType: "Azure.Sdk.SampleEvent",
        subject: "Event Subject",
        dataVersion: "1.0",
        data: {
          hello: "world"+x.toString()
        }
      }
    ]);
    x-=1;
  }
}

x();