/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { record } from './record';

/**
 * root element of the XML response
 */
export type searchRetrieveResponse = {
    version?: string;
    numberOfRecords?: number;
    records?: Array<record>;
    nextRecordPosition?: number;
};

