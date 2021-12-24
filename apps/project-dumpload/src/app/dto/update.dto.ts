import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    customerId?: string;
}
