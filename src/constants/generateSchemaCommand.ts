export const SQL_SCHEMAS_COMMAND = `
SELECT 
  json_agg(row_to_json(t)) 
FROM 
  (
    SELECT 
      t.tablename AS table,
      jsonb_agg(DISTINCT c.column_info) FILTER (WHERE c.column_info IS NOT NULL) AS columns,
      jsonb_agg(DISTINCT idx.index_info) FILTER (WHERE idx.index_info IS NOT NULL) AS indexes
    FROM 
      pg_tables t
      LEFT JOIN (
        SELECT 
          table_name, 
          to_jsonb(json_build_object('column_name', column_name, 'data_type', data_type)) AS column_info
        FROM 
          information_schema.columns
      ) c ON t.tablename = c.table_name
      LEFT JOIN (
        SELECT 
          t.relname AS table_name,
          to_jsonb(json_build_object('index_name', i.relname, 'column_name', a.attname)) AS index_info
        FROM 
          pg_class t,
          pg_class i,
          pg_index ix,
          pg_attribute a
        WHERE 
          t.oid = ix.indrelid
          AND i.oid = ix.indexrelid
          AND a.attrelid = t.oid
          AND a.attnum = ANY(ix.indkey)
          AND t.relkind = 'r'
      ) idx ON t.tablename = idx.table_name
    WHERE 
      t.schemaname = 'public'
    GROUP BY 
      t.tablename
  ) t;
`;