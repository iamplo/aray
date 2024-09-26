import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type GitRestApiResponse =
  | RestEndpointMethodTypes["repos"]["listForOrg"]["response"]["data"]
  | RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"];

export type TypeLabelParametersForOrg =
  RestEndpointMethodTypes["repos"]["listForOrg"]["parameters"]["type"];

export type TypeLabelParametersForUser =
  RestEndpointMethodTypes["repos"]["listForUser"]["parameters"]["type"];

export type SortLabelParameters =
  | RestEndpointMethodTypes["repos"]["listForOrg"]["parameters"]["sort"]
  | RestEndpointMethodTypes["repos"]["listForUser"]["parameters"]["sort"];

export type DirLabelParameters =
  | RestEndpointMethodTypes["repos"]["listForOrg"]["parameters"]["direction"]
  | RestEndpointMethodTypes["repos"]["listForUser"]["parameters"]["direction"];
