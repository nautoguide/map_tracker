In Qgis use DB manager to send route to ng_adventuresyndicate.gpx_upload



```SQL
DELETE FROM ng_adventuresyndicate.features
WHERE feature_type_id=(SELECT feature_type_id FROM ng_adventuresyndicate.feature_type WHERE feature_type='route_line');

INSERT INTO ng_adventuresyndicate.features(wkb_geometry,attributes,feature_type_id)
SELECT wkb_geometry,
	   jsonb_build_object('feature_type', 'route_line', 'route_name','Adventure Syndicate Route'),
	   (SELECT feature_type_id FROM ng_adventuresyndicate.feature_type WHERE feature_type='route_line')
FROM ng_adventuresyndicate.gpx_upload;	
```