import bodyParser from 'body-parser';
import { USE_CORS, WHITELIST } from '../config';
import cors from "cors"
import passport from 'passport';
const corsOptions = {
  origin: function (
    origin: any,
    callback: (arg0: Error | null, arg1: boolean | undefined) => void,
  ) {
    if (USE_CORS) {
      if (WHITELIST.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(
          new Error("Origin: " + origin + " is Not allowed by CORS"),
          false,
        )
      }
    } else callback(null, true)
  },
}

export default [
  bodyParser.urlencoded({ extended: true, limit: "50mb" }),
  bodyParser.json({ limit: "50mb" }),
  cors(corsOptions),
  passport.initialize()
]
