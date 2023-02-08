// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { Request } from "express";
// import { UserService } from "src/user/user.service";
// // import { AdminService } from "../admin/admin.service";
//
// type payload = {
//     email: string;
//     role: "ADMIN" | "USER"
//     sub: number;
//     iat: number;
//     exp: number;
// };
//
// @Injectable()
// export class userGuard implements CanActivate {
//     constructor(
//         private jwtService: JwtService,
//         private adminService: AdminService,
//         private userService: UserService
//     ) {
//     }
//
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const req: Request = context.switchToHttp().getRequest();
//         try {
//             const id = +req.params.id || +req.body.user_id;
//             console.log(id);
//
//             const authHeader = req.headers.authorization;
//             if (!authHeader) {
//                 throw new UnauthorizedException("4O4 N0t F0UND");
//             }
//             const bearer = authHeader.split(" ")[0];
//             const token = authHeader.split(" ")[1];
//             if (!token && !bearer) {
//                 throw new UnauthorizedException("404 N0T FOUND");
//             }
//
//             const user: payload = this.jwtService.verify(token);
//             if (user.role === "ADMIN") {
//                 const admin = await this.adminService.findOne(user.sub);
//                 if (admin) {
//                     if (admin.is_verified) {
//                         return true;
//                     }
//                 }
//             }
//             const checkUser = await this.userService.findOne(user.sub);
//             if (user.sub != id || checkUser.id != id) {
//                 throw new UnauthorizedException("404 NOT F0UND!");
//             }
//             return true;
//         } catch (e) {
//             console.log(e);
//             throw new UnauthorizedException("4O4 NOT FOUND");
//         }
//     }
// }
