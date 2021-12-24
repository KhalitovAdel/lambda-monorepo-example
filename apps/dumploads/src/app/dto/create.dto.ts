import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    customerId: string;
}
