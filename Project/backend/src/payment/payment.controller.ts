import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserPayloadDto } from '../auth/dto/UserPayload.dto';
import { JwtAuthGuard } from '../auth/guard/jwt';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
@ApiTags('Payment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async completeOrder(
    @Request() req: Express.Request,
    @Body() body: PaymentDto,
  ) {
    const user = req.user as UserPayloadDto;
    this.paymentService.completeOrder(user.sub, body.address);
  }
}
