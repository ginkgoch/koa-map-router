import { IFeature, FeatureCollection, ShapefileType, GeometryType } from 'ginkgoch-map';

export class MapUtils {
    static featuresToJSON(features: IFeature[]): any {
        return new FeatureCollection(features).toJSON();
    }

    static shapefileTypeToGeomType(shapefileType: ShapefileType): GeometryType {
        switch (shapefileType) {
            case ShapefileType.point:
                return GeometryType.Point;
            case ShapefileType.polyLine:
                return GeometryType.LineString;
            case ShapefileType.polygon:
                return GeometryType.Polygon;
            case ShapefileType.multiPoint:
                return GeometryType.MultiPoint;
            default:
                return GeometryType.Unknown;
        }
    }
}