'use strict';
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
let data ="";

module.exports.hello = async (event) => {
  console.log(event);
  if(event.httpMethod =="POST")
  {
     data =await createCustomerData(event);
  }
  if(event.httpMethod =="DELETE")
  {
     data =await deleteCustomerData(event);
  }
  if(event.method =="GET")
  {
     data =  await getcustomerDataById(event);
   console.log("data fetched"+data);
  }
 // data =  await createCustomerData(event);
  const response ={
    statusCode:200,
    body: JSON.stringify(event),
  }
 
return response;
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

const createCustomerData =async(event) =>
{
  console.log("Creates an customer datas");
  let req =JSON.parse(event.body);
  const params ={
    TableName:'CUSTOMER-DATA',
    Item:
    {
      customerId:req.customerId,
      customerName:req.customerName
    }
  }
  const data =dynamoDb.put(params).promise();
  return  "Data inserted Successfully";
}
const getcustomerDataById =async(event) =>
{

  console.log("inside get student details method");
  const params ={
          TableName :'CUSTOMER-DATA',
          Key:
          {
              'customerId':req.customerId
          }
      };
      const data =dynamoDb.get(params).promise();
      console.log("data"+JSON.stringify(data));
     return data;
}

const deleteCustomerData =async(event) =>
{
    let req=JSON.parse(event.body);
    console.log("inside delete student details method");
    const params ={
            TableName :'CUSTOMER-DATA',
            Key:
            {
                'customerId':req.customerId
            }
        };
        const data =dynamoDb.delete(params).promise();
       return "Delete successfull";
}
