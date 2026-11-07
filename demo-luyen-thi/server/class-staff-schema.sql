DO $$
BEGIN
 PERFORM pg_advisory_xact_lock(79601107);
 ALTER TABLE practice_classes ADD COLUMN IF NOT EXISTS class_code text;
 CREATE UNIQUE INDEX IF NOT EXISTS practice_class_code ON practice_classes(class_code) WHERE class_code IS NOT NULL;
 CREATE TABLE IF NOT EXISTS practice_class_staff (
  class_id uuid NOT NULL REFERENCES practice_classes(id),
  user_id uuid NOT NULL REFERENCES practice_users(id),
  role text NOT NULL CHECK(role IN ('teacher','assistant')),
  PRIMARY KEY(class_id,user_id)
 );
 CREATE INDEX IF NOT EXISTS practice_class_staff_user ON practice_class_staff(user_id,class_id);
END $$;
