
const Domain = 'http://192.168.1.106';
const ApiPort = '8080';
export const BASE_API_URL = `${Domain}:${ApiPort}/blog-api/`;
export const GithubOAuth2ClientId = 'f915c34a25009eae0d33';
export const GithubOAuth2Url = `https://github.com/login/oauth/authorize?client_id=${GithubOAuth2ClientId}&scope=user,public_repo`;

export const HttpRequestOption = {
  headers: {
    'Access-Control-Allow-Origin': Domain,
    'Access-Control-Allow-Methods': ['GET', 'PUT', 'DELETE', 'POST', 'OPTIONS', 'PATCH', 'HEAD', 'TRACE'],
    'Access-Control-Max-Age': '3600',
  },
  withCredentials: true
};
