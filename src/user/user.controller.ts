import { Controller, Post, Body, Get,  Put, Patch, Delete,  UseInterceptors, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { UpdatePatchUserDTO } from "src/user/dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "src/user/dto/update-put-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Post()
  async create(@Body() {email, name, password,birthAt, role}: CreateUserDTO){
      return this.userService.create({email, name, password,birthAt, role});

  }

  @Get()
  async list(){
    return this.userService.list();
  }

  @Get(':id')
  async show( @ParamId() id: number){
    console.log(`Valor do id:  ${id}`);
    return this.userService.show(id);
  }

@Put(':id')
async update(@Body() data: UpdatePutUserDTO, @ParamId() id: 
number){
  return this.userService.update(id, data)
}

@Patch(':id')
async updatePartial(@Body()data : UpdatePatchUserDTO,@ParamId() id: number){
  return this.userService.updatePartial(id, data)
  
}


@Delete(':id')
  async delete(@ParamId() id:  number){
    return this.userService.delete(id);
  }

}