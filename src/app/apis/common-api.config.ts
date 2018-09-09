
const Domain = 'https://www.521fan.com';

export const BASE_API_URL = Domain + '/blog-api/';
export const GithubOAuth2ClientId = 'f915c34a25009eae0d33';
export const GithubOAuth2Url = `https://github.com/login/oauth/authorize?client_id=${GithubOAuth2ClientId}&scope=user,public_repo`;

export const HttpRequestOption = {
  withCredentials: true
};
