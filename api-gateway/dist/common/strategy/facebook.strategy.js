"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_facebook_1 = require("passport-facebook");
let FacebookStrategy = class FacebookStrategy extends (0, passport_1.PassportStrategy)(passport_facebook_1.Strategy, 'facebook') {
    constructor() {
        super({
            clientID: '982751452687664',
            clientSecret: 'fd484db9c14ba320fa871ee9d93c1916',
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            profileFields: [
                'id',
                'name',
                'gender',
                'profileUrl',
                'displayName',
                'photos',
                'emails',
                'birthday',
            ],
            scope: [
                'public_profile',
                'user_birthday',
                'user_photos',
                'user_gender',
                'user_link',
                'email',
            ],
        });
    }
    async validate(accessToken, refreshToken, profileFields, done) {
        const { id, displayName, gender, profileUrl, emails, photos } = profileFields;
        const user = {
            facebookId: id,
            email: profileFields._json.email,
            name: displayName,
            gender: gender,
            profileUrl,
            avatarUrl: photos[0].value,
            birthday: profileFields._json.birthday,
            accessToken,
        };
        done(null, user);
    }
};
FacebookStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FacebookStrategy);
exports.FacebookStrategy = FacebookStrategy;
//# sourceMappingURL=facebook.strategy.js.map