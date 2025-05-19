SELECT pgflow.create_flow('analyzeWebsite', max_attempts => 3);
SELECT pgflow.add_step('analyzeWebsite', 'website');
SELECT pgflow.add_step('analyzeWebsite', 'summary', ARRAY['website']);
SELECT pgflow.add_step('analyzeWebsite', 'tags', ARRAY['website']);
SELECT pgflow.add_step('analyzeWebsite', 'saveToDb', ARRAY['summary', 'tags']);
