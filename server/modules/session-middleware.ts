import cookieSession from 'cookie-session';
import { badSecret, exampleBadSecret } from '../constants/warnings';

const serverSessionSecret = (): string | undefined => {
  if (!process.env.SERVER_SESSION_SECRET ||
      process.env.SERVER_SESSION_SECRET.length < 8 ||
      process.env.SERVER_SESSION_SECRET === exampleBadSecret) {
    console.log(badSecret);
  }

  return process.env.SERVER_SESSION_SECRET;
};

export default cookieSession({
  secret: serverSessionSecret() || 'secret', // please set this in your .env file
  keys: ['user'],
  maxAge: 60 * 60 * 1000, // Set to 1 hour - 60 min/hour * 60 s/min * 1000 ms/s
  secure: false,

  // ADDITIONAL OPTIONS OUTSIDE OF 'secret', 'keys', and 'name':
  // maxAge: a number representing the milliseconds from Date.now() for expiry
  // expires: a Date object indicating the cookie's expiration date (expires at the end of session by default).
  // path: a string indicating the path of the cookie (/ by default).
  // domain: a string indicating the domain of the cookie (no default).
  // secure: a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS).
  // secureProxy: a boolean indicating whether the cookie is only to be sent over HTTPS (use this if you handle SSL not in your node process).
  // httpOnly: a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (true by default).
  // signed: a boolean indicating whether the cookie is to be signed (false by default). If this is true, another cookie of the same name with the .sig suffix appended will also be sent, with a 27-byte url-safe base64 SHA1 value representing the hash of cookie-name=cookie-value against the first Keygrip key. This signature key is used to detect tampering the next time a cookie is received.
  // overwrite: a boolean indicating whether to overwrite previously set cookies of the same name (true by default). If this is true, all cookies set during the same request with the same name (regardless of path or domain) are filtered out of the Set-Cookie header when setting this cookie.
});
