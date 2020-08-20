import moment, {Moment} from 'moment';
import {JsonConverter, JsonCustomConvert} from 'json2typescript';

@JsonConverter
export class MomentDeserializer implements JsonCustomConvert<Moment> {
	deserialize = (date?: string): Moment => {
		return date ? moment(date) : moment(0);
	};

	serialize = (date: Moment): string => {
		return date.format('YYYY-MM-DD HH:mm:ss');
	};
}
