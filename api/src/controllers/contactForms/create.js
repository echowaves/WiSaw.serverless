import ContactForm from '../../models/contactForm'

import moment from 'moment'
import Sequelize from 'sequelize'


export  async function main(event, context, callback) {
  //Instruct the lambda to exit immediately
  //and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false
  const data = JSON.parse(event.body);

  const uuid = data ? data.uuid : null


  const description = data ? data.description : null

  if(!data || !uuid || !description) {
    console.log("setting status to 400")
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing'})
    }
    callback(null, response)
    return
  }
  const createdAt = moment()
  const updatedAt = createdAt

  // create and safe record
  let contactForm
  try {
    contactForm = await ContactForm.create({
      uuid,
      description,
      createdAt,
      updatedAt
    })
  } catch(err) {
    console.log("unable to create contactForm", err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'unable to create contactForm'})
    }
    callback(null, response)
    return
  }


  // Resond to request indicating the create contactForm was created
  const response = {
    statusCode: 201,
    body: JSON.stringify({ status: 'success' })
  }
  callback(null, response)
}
