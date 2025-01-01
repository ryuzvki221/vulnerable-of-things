import { Connection } from "../../config/Database";
import { Metric } from "../models";

export const MetricRepository = Connection.getRepository(Metric).extend({
  bulkCreate(metrics: Metric[]) {
    return this.manager
      .createQueryBuilder()
      .insert()
      .into(Metric)
      .values(metrics)
      .execute();
  },

});
