import {getExam,grade} from './scoring.mjs';

const correction='flyers16-listening-part1-20261110';
const original={Oliver:'p7',Robert:'p2',Isabel:'p3',Emma:'p6',Sophia:'p5'};
export function correctedFlyers16Result(attempt){
 const exam=getExam('flyers-16');
 if(attempt.exam_id!==exam.id||attempt.exam_version!==exam.version||!attempt.submitted_at||!attempt.result)return null;
 const previous=attempt.result.review?.filter(q=>q.skill==='listening'&&q.part==='l1');
 if(previous?.length!==5||!previous.every(q=>q.expected===original[q.prompt]))return null;
 const fresh=grade(exam,attempt.answers).review.filter(q=>q.skill==='listening'&&q.part==='l1');
 const result=structuredClone(attempt.result),byId=new Map(fresh.map(q=>[q.id,q]));
 if(!previous.every(q=>byId.has(q.id))||result.listening.total!==25)return null;
 result.review=result.review.map(q=>q.skill==='listening'&&q.part==='l1'?byId.get(q.id):q);
 result.listening.correct+=fresh.filter(q=>q.correct).length-previous.filter(q=>q.correct).length;
 result.listening.score=Math.round(500*result.listening.correct/result.listening.total)/10;
 result.total=Math.round((result.reading.score+result.listening.score)*10)/10;
 return result;
}

export async function correctFlyers16Results(repo){
 const exam=getExam('flyers-16');
 const rows=await repo.q(`SELECT id,exam_id,exam_version,answers,result,submitted_at FROM practice_attempts
  WHERE exam_id=$1 AND exam_version=$2 AND submitted_at IS NOT NULL
  AND result->'review' @> '[{"id":"l1-1","skill":"listening","part":"l1","expected":"p7"}]'::jsonb`,[exam.id,exam.version]);
 const changes=rows.map(row=>({row,result:correctedFlyers16Result(row)})).filter(change=>change.result);
 if(!changes.length)return 0;
 await repo.q(`DO $$ BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('wewin-score-corrections-schema'));
  CREATE TABLE IF NOT EXISTS practice_score_corrections (
  attempt_id uuid NOT NULL REFERENCES practice_attempts(id),correction_key text NOT NULL,
  previous_result jsonb NOT NULL,corrected_result jsonb NOT NULL,corrected_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(attempt_id,correction_key)); END $$`);
 let count=0;
 for(const {row,result} of changes){
  const updated=await repo.q(`WITH backup AS (
   INSERT INTO practice_score_corrections(attempt_id,correction_key,previous_result,corrected_result)
   SELECT id,$6,result,$2::jsonb FROM practice_attempts WHERE id=$1 AND result=$5::jsonb
   ON CONFLICT DO NOTHING RETURNING attempt_id
  ), corrected AS (
   UPDATE practice_attempts SET result=$2::jsonb
   WHERE id=$1 AND exam_id=$3 AND exam_version=$4 AND submitted_at IS NOT NULL
   AND result=$5::jsonb AND id IN (SELECT attempt_id FROM backup) RETURNING id
  ), ranked AS (
   UPDATE practice_rankings SET listening_score=$7,total_score=$8
   WHERE attempt_id IN (SELECT id FROM corrected) RETURNING attempt_id
  ) SELECT id FROM corrected`,[row.id,JSON.stringify(result),exam.id,exam.version,JSON.stringify(row.result),correction,result.listening.score,result.total]);
  count+=updated.length;
 }
 return count;
}
