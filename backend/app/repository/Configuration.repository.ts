import { Connection } from "../../config/Database";
import { Configuration } from "../models";

export const ConfigurationRepository = Connection.getRepository(Configuration).extend({
  bulkCreate(configurations: Configuration[]) {
    return this.manager
      .createQueryBuilder()
      .insert()
      .into(Configuration)
      .values(configurations)
      .execute();
  },

});
