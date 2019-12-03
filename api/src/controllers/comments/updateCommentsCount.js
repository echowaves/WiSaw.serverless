import { sequelize } from '../../../../config/consts'

export default class UpdateCommentsCount {
  static async update(photoId) {
    await sequelize.query(`update "Photos" set "commentsCount" = \
    (select count(*) from "Comments" where "Comments"."photoId" = ${photoId} and active = true) \
    where id = ${photoId}`)
  }
}
