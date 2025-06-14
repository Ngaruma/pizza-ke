
-- Add external_url column to pizzas table
ALTER TABLE pizzas ADD COLUMN external_url text;

-- Add comment to describe the column
COMMENT ON COLUMN pizzas.external_url IS 'External URL to vendor''s own pizza page for checkout';
