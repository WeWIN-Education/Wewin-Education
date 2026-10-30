import {randomBytes,scrypt as scryptCallback,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
const scrypt=promisify(scryptCallback);
export async function passwordHash(password){
 if(typeof password!=='string'||password.length<3||password.length>128)throw new Error('Use a password of 3–128 characters.');
 const salt=randomBytes(16).toString('hex'),key=await scrypt(password,salt,64);
 return salt+':'+key.toString('hex');
}
export async function passwordMatches(password,encoded){
 if(typeof password!=='string'||password.length>128||typeof encoded!=='string')return false;
 const [salt,key]=encoded.split(':');if(!salt||! /^[0-9a-f]{128}$/.test(key||''))return false;
 const actual=await scrypt(password,salt,64);return timingSafeEqual(actual,Buffer.from(key,'hex'));
}
