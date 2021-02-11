import env from '@/utils/env/macro'
import { ApolloClient, gql, makeVar } from '@apollo/client'

/**
 * Auth flow
 *
 *    Client/Frontend     Backend     Google
 *       r-------------------------------> redirect to createRedirectionUrl() (1)
 *       <-------------------------------r code got redirected to return_uri (2)
 *       o<---------------->o              GraphQL verify using authenticateByCode (3)
 *
 *   r--> is client redirect
 *   o<->o is graphql query
 *
 *  In case that the redirect_uri is unstable (for Render PR). use redirect redirector in the backend at $backend/auth/callback
 *  during step (1) and attach the final redirection target as state.returnURI.
 */

/**
 * Create redirection url for redirecting to Google
 * that will return the result to this client's origin.
 */
export function getRedirectUrl() {
  const clientId = env.googleauth.clientid
  const callbackUrl = `${location.origin}/googleauthcallback`

  if (typeof clientId !== 'string')
    throw new Error(
      "GoogleAuth client id environment is not a string (because it's not set?). Failed to generate redirect URL"
    )

  const queries = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    access_type: 'online',
    include_granted_scopes: 'true',
  })

  if (env.isPrBuild) {
    // redirect_url unstable. use redirect redirector
    const codeRedirector = env.googleauth.coderedirector
    if (typeof codeRedirector !== 'string')
      throw new Error(
        "Auth CodeRedirector environment URL is not a string (because it's not set?). RenderPR requires it"
      )
    queries.set('redirect_uri', codeRedirector)
    queries.set('state', `returnURI=${callbackUrl}`)
  } else {
    queries.set('redirect_uri', callbackUrl)
  }

  return `https://accounts.google.com/o/oauth2/v2/auth?${queries.toString()}`
}

/**
 * Query for exchanging Google OAuth code to JWT
 *
 * @see authenticateByCode
 */
const EXCHANGE_JWT = gql`
  mutation ExchangeJwtToken($code: String!, $redirectURI: String!) {
    verify(code: $code, redirectURI: $redirectURI) {
      accessToken
      _id
      firstName
    }
  }
`

/**
 * JWT Response from backend using EXCHANGE_JWT query
 */
interface ExchangeJwtResponse {
  verify: AuthData
}

/**
 * User's authorization data for authenticating with the backend
 */
interface AuthData {
  accessToken: string
  _id: string
  firstName: string
}

/**
 * Exchange Google OAuth code for JWT token and store it.
 *
 * @param client
 * @param code
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export async function authenticateByCode(client: ApolloClient<object>, code: string) {
  const { data, errors } = await client.mutate<ExchangeJwtResponse>({
    mutation: EXCHANGE_JWT,
    variables: {
      code,
      redirectURI: new URLSearchParams(getRedirectUrl()).get('redirect_uri'),
    },
  })

  if (errors) throw errors
  if (!data?.verify) throw new Error('No verify result')

  localStorage.setItem(AUTHDATA_LOCALSTORAGE_FIELD, JSON.stringify(data.verify))
  authData(data.verify)
}

/**
 * User auth data when requested from Apollo
 * @see GET_AUTH_DATA
 */
export interface GetAuthData {
  authData: AuthData
}

/**
 * Query to request user's auth data return {@link GetAuthData}
 */
export const GET_AUTH_DATA = gql`
  query GetAuthData {
    authData @client
  }
`

/**
 * Logging the user out
 */
export function logout() {
  localStorage.removeItem(AUTHDATA_LOCALSTORAGE_FIELD)
  authData(null)
}

// Apollo local state and caching ===============

const AUTHDATA_LOCALSTORAGE_FIELD = 'authdata'

function getAuthDataFromLocalStorage(): AuthData | null {
  if (typeof localStorage == 'undefined') return null
  const local = localStorage.getItem(AUTHDATA_LOCALSTORAGE_FIELD)
  if (!local) return null

  return JSON.parse(local)
}

export const authData = makeVar<AuthData | null>(getAuthDataFromLocalStorage())

export const authDataFieldPolicy = {
  authData: {
    read() {
      return authData()
    },
  },
}