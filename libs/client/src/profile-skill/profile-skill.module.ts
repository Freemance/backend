import {Module} from '@nestjs/common';
import {ProfileSkillResolver, ProfileSkillService} from '.';

@Module({
    providers: [ProfileSkillResolver, ProfileSkillService]
})
export class ProfileSkillModule {
}
