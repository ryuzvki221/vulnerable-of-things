import * as express from "express";
import {  VulnerabilityRouter } from "../app/routes";


interface IROUTER {
  path: string;
  middleware: any[];
  handler: express.Router;
}

const Vulnerability = new VulnerabilityRouter();

export const ROUTER: IROUTER[] = [

  {
    handler: Vulnerability.router,
    middleware: [],
    path: "/api/v1",
  },

];
