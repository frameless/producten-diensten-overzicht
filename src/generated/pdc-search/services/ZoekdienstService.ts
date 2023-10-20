/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { searchRetrieveResponse } from '../models/searchRetrieveResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ZoekdienstService {

    /**
     * Producten En Diensten API
     * @returns searchRetrieveResponse De zoekresultaten
     * @throws ApiError
     */
    public static zoekdienst({
        version,
        operation,
        xConnection,
        query,
        startRecord,
        maximumRecords,
        recordSchema,
        xInfo1Accept,
    }: {
        /**
         * Welke versie wordt gebruikt
         */
        version: number,
        /**
         * Welke operatie wil je uitvoeren
         */
        operation: string,
        /**
         * In welke databank wil je zoeken
         */
        xConnection: string,
        /**
         * De daadwerkelijke zoekquery in CQL formaat
         */
        query: string,
        startRecord?: number,
        maximumRecords?: number,
        recordSchema?: string,
        /**
         * Wanneer deze parameter wordt meegegeven, worden naast de gebruikelijke zoekresultaten ook facetwaarden teruggegeven.
         */
        xInfo1Accept?: string,
    }): CancelablePromise<searchRetrieveResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Search',
            query: {
                'version': version,
                'operation': operation,
                'x-connection': xConnection,
                'query': query,
                'startRecord': startRecord,
                'maximumRecords': maximumRecords,
                'recordSchema': recordSchema,
                'x-info-1-accept': xInfo1Accept,
            },
        });
    }

}
