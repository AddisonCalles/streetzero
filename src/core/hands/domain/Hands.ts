import { Point } from '../../../interfaces/point';

export type LandMarkList = Point[];

export type Hand = {
    landmarks: LandMarkList;
    score: number;
};
