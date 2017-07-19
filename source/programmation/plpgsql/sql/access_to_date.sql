--
-- Fonction qui converti un entier en date
-- Dans Lotus 1-2-3 et Access, le jour 0 est égal au 30/12/1899
-- Auteur: Christophe CHAUVET
-- License: Creative commons BY-SA
--   https://creativecommons.org/licenses/by-sa/4.0/
--
CREATE OR REPLACE FUNCTION access_to_date(
   a_num INTEGER)
RETURNS date AS
$BODY$

BEGIN

  RETURN ('1899-12-30'::date + (a_num||' day')::interval)::date;

END;

$BODY$
LANGUAGE plpgsql;
