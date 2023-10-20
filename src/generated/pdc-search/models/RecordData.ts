/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EnrichedData } from './EnrichedData';
import type { OriginalData } from './OriginalData';

/**
 * Elements of the search results
 */
export type RecordData = {
    gzd?: {
        originalData?: OriginalData;
        enrichedData?: EnrichedData;
    };
};

