import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";
import { filter } from "rxjs";

export const User = createParamDecorator((filter: string, context: ExecutionContext) => {
  
    const request =  context.switchToHttp().getRequest();

    if (request.user){
      if (filter){
        return request.user[filter];
      }else{
        return request.user;
      }


      
    } else {
        throw new NotFoundException("Usuário não encontrado no request. use o AuthGard para ober o usuario")
    }


});