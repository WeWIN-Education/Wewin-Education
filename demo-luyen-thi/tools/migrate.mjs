import {productionRepository} from '../server/repository.mjs';
const repo=await productionRepository();if(!repo)throw new Error('Set DATABASE_URL privately before migration.');await repo.migrate();console.log('Practice schema ready.');
