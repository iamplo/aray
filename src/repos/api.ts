import { Octokit } from "octokit";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

const octokit = new Octokit({});

export async function fetchOrganizationRepos(
  options: RestEndpointMethodTypes["repos"]["listForOrg"]["parameters"] & {
    pageSize: number;
  }
) {
  const collection = [];

  const { direction, sort, type, org, pageSize } = options;

  // const e = Object.entries(options).reduce(
  //   (obj, [key, value]) => (value ? { ...obj, [key]: value } : { ...obj }),
  //   {}
  // );

  const iterator = octokit.paginate.iterator(octokit.rest.repos.listForOrg, {
    direction,
    sort,
    type,
    org,
    per_page: pageSize,
  });
  for await (const { data } of iterator) {
    collection.push(data);
  }
  return collection;
}

export async function fetchUserRepos(
  options: RestEndpointMethodTypes["repos"]["listForUser"]["parameters"] & {
    pageSize: number;
  }
) {
  const collection = [];

  const { direction, sort, type, username, pageSize } = options;

  const iterator = octokit.paginate.iterator(octokit.rest.repos.listForUser, {
    direction,
    sort,
    type,
    username,
    per_page: pageSize,
  });
  for await (const { data } of iterator) {
    collection.push(data);
  }
  return collection;
}
