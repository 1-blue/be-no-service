import { v4 as uuidv4 } from "uuid";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";

import { OAuthUser } from "src/types";

export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    });
  }

  // refreshToken을 받기 위함
  authorizationParams() {
    return {
      access_type: "offline",
      prompt: "select_account",
    };
  }

  /** 응답값이 `serializeUser()`로 들어감 */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const oauthUser: OAuthUser = {
      id: uuidv4(),
      email: profile._json.email,
      provider: "google",
      providerId: String(profile.id),
      accessToken,
      refreshToken,
      nickname: profile._json.name,
      image: profile._json.picture,
    };

    done(null, oauthUser, accessToken);
  }
}
