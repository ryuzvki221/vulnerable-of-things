import { Connection } from "../../config/Database";
import { Weakness } from "../models";

export const WeaknessRepository = Connection.getRepository(Weakness).extend({
  bulkCreate(weaknesses: Weakness[]) {
    return this.manager
      .createQueryBuilder()
      .insert()
      .into(Weakness)
      .values(weaknesses)
      .execute();
  },

});
