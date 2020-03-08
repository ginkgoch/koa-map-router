import { IFeature, FeatureCollection, ShapefileType, GeometryType, ViewportUtils } from 'ginkgoch-map';

export class MapUtils {
    static featuresToJSON(features: IFeature[]): any {
        return new FeatureCollection(features).toJSON();
    }

    static simplifyFeatures(features: IFeature[], featureCRS: string, scale: number, tolerance: number = 1): IFeature[] {
        return ViewportUtils.compressFeatures(features, featureCRS, scale, tolerance);
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