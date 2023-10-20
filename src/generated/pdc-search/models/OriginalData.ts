/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OwmsKern } from './OwmsKern';
import type { OwmsMantel } from './OwmsMantel';
import type { ScMeta } from './ScMeta';

export type OriginalData = {
    'overheidproduct:scproduct'?: {
        'overheidproduct:meta'?: {
            'overheidproduct:owmskern'?: OwmsKern;
            'overheidproduct:owmsmantel'?: OwmsMantel;
            'overheidproduct:scmeta'?: ScMeta;
        };
    };
};

