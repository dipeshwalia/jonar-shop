import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  // TODO: add refresh token
  @Post('/')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Req() req,
  ): Promise<{ accessToken: string }> {

    return this.authService.signIn(authCredentialsDto);
  }
}
