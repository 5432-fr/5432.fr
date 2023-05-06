--
-- Fonction qui converti une date en entier
-- Dans Lotus 1-2-3 et Access, le jour 0 est égal au 30/12/1899
-- Auteur: Christophe CHAUVET
-- License: Creative commons BY-SA
--   https://creativecommons.org/licenses/by-sa/4.0/
--
CREATE OR REPLACE FUNCTION date_to_access(
   a_date DATE)
RETURNS integer AS
$BODY$

BEGIN

  RETURN (a_date - '1899-12-30'::date)::integer;

END;

$BODY$
LANGUAGE plpgsql;
