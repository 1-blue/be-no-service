import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class KakaoAuthGuard extends AuthGuard("kakao") {
  // `super.logIn()`에서 세션 쿠키를 전달함
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);

    if (can) {
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
    }

    return true;
  }
}
