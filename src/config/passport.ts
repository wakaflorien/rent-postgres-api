import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserModel } from '../models/user.model';
import dotenv from 'dotenv';
dotenv.config();

passport.serializeUser((user: any, done) => {
done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
try {
    const user = await UserModel.findById(id);
    done(null, user);
} catch (error) {
    done(error, null);
}
});

passport.use(
new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await UserModel.findByGoogleId(profile.id);
        
        if (existingUser) {
        return done(null, existingUser);
        }

        const newUser = await UserModel.create({
        google_id: profile.id,
        email: profile.emails?.[0]?.value || '',
        display_name: profile.displayName,
        });

        return done(null, newUser);
    } catch (error) {
        return done(error as Error, undefined);
    }
    }
)
);

export default passport;

