import { sequelize } from '../../../../config/consts'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, cb) {
  // update all comments counts
  /* eslint-disable no-multi-str */
  try {
    await sequelize.query('update "Photos" set "commentsCount" = \
  (select count(*) from "Comments" where "Comments"."photoId" = "Photos"."id" and active = true) \
  where "createdAt" >= date_trunc(\'month\', current_date - interval \'1 month\')')
  } catch (err) {
    console.log(JSON.stringify(err))
  }
  cb(null, 'success everything')
  return true
}
