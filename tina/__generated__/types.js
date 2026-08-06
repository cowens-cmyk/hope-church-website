export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const ServiceTimesPartsFragmentDoc = gql`
    fragment ServiceTimesParts on ServiceTimes {
  __typename
  first
  second
  third
  stream
  runthrough
  runthroughEnd
  firstServiceClasses
  otherServiceClasses
}
    `;
export const ServiceTimesDocument = gql`
    query serviceTimes($relativePath: String!) {
  serviceTimes(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServiceTimesParts
  }
}
    ${ServiceTimesPartsFragmentDoc}`;
export const ServiceTimesConnectionDocument = gql`
    query serviceTimesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServiceTimesFilter) {
  serviceTimesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServiceTimesParts
      }
    }
  }
}
    ${ServiceTimesPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    serviceTimes(variables, options) {
      return requester(ServiceTimesDocument, variables, options);
    },
    serviceTimesConnection(variables, options) {
      return requester(ServiceTimesConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
