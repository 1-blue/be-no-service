import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";

import { RequestWithOAuthUser } from "src/types";
import { IsLoggedIn, IsLoggedOut } from "src/guards";
import { AuthService } from "src/v1/auth/auth.service";
import { LocalAuthGuard } from "src/v1/auth/local/local.guard";
import { KakaoAuthGuard } from "src/v1/auth/kakao/kakao.guard";
import { GoogleAuthGuard } from "src/v1/auth/google/google.guard";

@Controller("api/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ==================== local login ====================
  @UseGuards(IsLoggedOut)
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @HttpCode(200)
  async login(@Req() req: Request) {
    return req.user;
  }

  // ==================== kakao login ====================
  @UseGuards(IsLoggedOut)
  @UseGuards(KakaoAuthGuard)
  @Get("login/kakao")
  async oauthKakao() {
    // `KakaoAuthGuard` 에서 로직을 처리하고 응답값을 `login/kakao/redirect`로 보냄
  }

  @UseGuards(KakaoAuthGuard)
  @Get("login/kakao/redirect")
  async oauthKakaoRedirect(
    @Req() req: RequestWithOAuthUser,
    @Res() res: Response,
  ) {
    await this.authService.validateOAuth(req.user);

    // 카카오에서 제공해준 토큰들 ( 로그아웃 시 사용 )
    res.cookie("accessToken", req.user.accessToken);
    res.cookie("refreshToken", req.user.refreshToken);

    return res.redirect(process.env.CLIENT_URL + "/oauth/redirect");
  }

  // ==================== google login ====================
  @UseGuards(IsLoggedOut)
  @UseGuards(GoogleAuthGuard)
  @Get("login/google")
  async oauthGoogle() {
    // `GoogleAuthGuard` 에서 로직을 처리하고 응답값을 `login/google/redirect`로 보냄
  }

  @UseGuards(GoogleAuthGuard)
  @Get("login/google/redirect")
  async oauthGoogleRedirect(
    @Req() req: RequestWithOAuthUser,
    @Res() res: Response,
  ) {
    await this.authService.validateOAuth(req.user);

    // 구글에서 제공해준 토큰들 ( 로그아웃 시 사용 )
    res.cookie("accessToken", req.user.accessToken);
    res.cookie("refreshToken", req.user.refreshToken);

    return res.redirect(process.env.CLIENT_URL + "/oauth/redirect");
  }

  @UseGuards(IsLoggedIn)
  @Post("logout")
  @HttpCode(200)
  logout(@Req() req: Request, @Res() res: Response): void {
    const { accessToken } = req.cookies;

    try {
      // 카카오 로그인인 경우 로그아웃 처리
      if (req.user.provider === "kakao") {
        fetch("https://kapi.kakao.com/v1/user/unlink", {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      // 구글 로그인인 경우 로그아웃 처리
      if (req.user.provider === "google") {
        fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
          method: "POST",
        });
      }
    } catch (error) {
      console.error("[Error] OAuth 로그아웃 >> ", error);
    }

    return req.logout({ keepSessionInfo: false }, () => {
      res.clearCookie("connect.sid");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      req.session.destroy((error) => {
        console.error("[Error] req.session.destroy() >> ", error);
      });

      res.send();
    });
  }
}
