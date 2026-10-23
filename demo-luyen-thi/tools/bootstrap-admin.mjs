import {productionRepository} from '../server/repository.mjs';
import {passwordHash} from '../server/platform.mjs';
const {BOOTSTRAP_USERNAME:username,BOOTSTRAP_PASSWORD:password,BOOTSTRAP_NICKNAME:nickname}=process.env;
if(!username||!password||!nickname)throw new Error('Set BOOTSTRAP_USERNAME, BOOTSTRAP_PASSWORD and BOOTSTRAP_NICKNAME privately for this one-time command.');
const repo=await productionRepository();if(!repo)throw new Error('DATABASE_URL missing');
if((await repo.q("SELECT id FROM practice_users WHERE role='admin' LIMIT 1")).length)throw new Error('An administrator already exists. Use the account management screen.');
await repo.createUser({username,nickname,role:'admin',passwordHash:await passwordHash(password)});console.log('Initial administrator created; change the temporary password at first sign-in.');
