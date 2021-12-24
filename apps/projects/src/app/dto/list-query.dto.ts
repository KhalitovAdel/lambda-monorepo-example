import { ApiProperty } from '@nestjs/swagger';

export class ListDto {
    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    customerId?: string;
}
