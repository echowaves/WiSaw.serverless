import moment from 'moment'
import Sequelize from 'sequelize'
import {sequelize} from '../../../../consts'

export  async function main(event, context, callback) {
  //Instruct the lambda to exit immediately
  //and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false

  const uuid = ctx.request.body.uuid

  if(!uuid ) {
    logger.debug("setting status to 400")
    ctx.response.status = 400
    ctx.body = { error: 'parameters missing'}
    return
  }
  const createdAt = moment()
  const updatedAt = createdAt

  // create and safe record
    let abuseReport
    try {
      abuseReport = await AbuseReport.create({
        uuid,
        createdAt,
        updatedAt
      })
    } catch(err) {
      logger.error("unable to create AbuseReport", err)
      ctx.response.status = 500
      ctx.body = { error: 'Unable to Report Abuse'}
      return
    }


    // Resond to request indicating the aubse report was created
    ctx.response.status = 201
    ctx.body = { status: 'success' }
  }
