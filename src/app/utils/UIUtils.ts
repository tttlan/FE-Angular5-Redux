/**
 * Modify Util for validators
 */
import * as _ from 'lodash';

export class UIUtils {
    isNullOrUndefined(value: any): boolean {
        return _.isNil(value) || value === '';
    }

    isEmpty(value: any): boolean {
        return _.isEmpty(value) || value === '';
    }

    formatString(msg: string, ...characters: any[]): string {
        for (let i = 0; i < characters.length; i++) {
            let regexp = new RegExp('\\{' + i + '\\}', 'gi');
            msg = msg.replace(regexp, characters[i]);
        }

        return msg;
    }
}