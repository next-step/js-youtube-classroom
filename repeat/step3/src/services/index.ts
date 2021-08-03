import {container} from "~@core";

import { YoutubeSearchService } from "./YoutubeSearchService";
import { RecentSearchesService } from "./RecentSearchesService";
import { LectureVideoService } from "./LectureVideoService";

export const youtubeSearchService: YoutubeSearchService = container.resolve(YoutubeSearchService);
export const lectureVideoService: LectureVideoService = container.resolve(LectureVideoService);
export const recentSearchesService: RecentSearchesService = container.resolve(RecentSearchesService);