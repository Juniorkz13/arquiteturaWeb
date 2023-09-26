import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'

dotenv.config()
const GoogleStrategy = Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: '540253719507-p5k5ajimcecsflelhjl5ijn7irrij9u6.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/google/callback',
            passReqToCallback: true
        },
        function (request, accessToken, refreshToken, profile, done) {
            return done(null, profile)
        }
    )
)

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

export default googleAuth
